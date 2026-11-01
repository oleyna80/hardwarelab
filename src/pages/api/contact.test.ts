import { afterEach, describe, expect, it, vi } from "vitest";
import type { APIContext } from "astro";
import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

const makeRequest = (body: string, origin = "https://hardwarelab.org") =>
    new Request("https://hardwarelab.org/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", origin, "x-real-ip": "192.0.2.1" },
        body,
    });
const validBody = JSON.stringify({ form_type: "newsletter", email: "test@example.com", turnstile_token: "synthetic-token" });

async function handler() {
    vi.resetModules();
    return (await import("./contact")).POST;
}

afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("contact endpoint boundaries", () => {
    it("rejects a development origin in production before any outbound request", async () => {
        vi.stubEnv("NODE_ENV", "production");
        vi.stubEnv("ALLOWED_ORIGINS", "http://localhost:4321");
        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);
        const post = await handler();
        expect((await post({ request: makeRequest(validBody, "http://localhost:4321") } as APIContext)).status).toBe(403);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("rejects an untrusted origin and oversized body before any outbound request", async () => {
        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);
        const post = await handler();
        expect((await post({ request: makeRequest(validBody, "https://example.invalid") } as APIContext)).status).toBe(403);
        expect((await post({ request: makeRequest('"' + "x".repeat(16384) + '"') } as APIContext)).status).toBe(413);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("sends synthetic verification with an abort signal and rejects webhook redirects", async () => {
        vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
        vi.stubEnv("N8N_WEBHOOK_URL", "https://n8n.hardwarelab.org/test");
        vi.stubEnv("N8N_WEBHOOK_SECRET", "test-webhook-secret");
        const fetchMock = vi.fn()
            .mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }))
            .mockRejectedValueOnce(new TypeError("fetch failed"));
        vi.stubGlobal("fetch", fetchMock);
        const post = await handler();
        expect((await post({ request: makeRequest(validBody) } as APIContext)).status).toBe(503);
        expect(fetchMock.mock.calls[0]?.[1]?.signal).toBeInstanceOf(AbortSignal);
        expect(fetchMock.mock.calls[1]?.[1]?.redirect).toBe("error");
    });

    it("does not follow a webhook redirect using native fetch", async () => {
        let redirects = 0;
        let targetRequests = 0;
        const server = createServer((request, response) => {
            if (request.url === "/redirect") {
                redirects += 1;
                response.writeHead(302, { location: "/target" }).end();
            } else {
                targetRequests += 1;
                response.writeHead(200).end();
            }
        });
        await new Promise<void>((resolve, reject) => {
            server.once("error", reject);
            server.listen(0, "127.0.0.1", resolve);
        });
        try {
            const { port } = server.address() as AddressInfo;
            vi.stubEnv("TURNSTILE_SECRET_KEY", "");
            vi.stubEnv("TURNSTILE_ENFORCE", "false");
            vi.stubEnv("N8N_WEBHOOK_URL", `http://127.0.0.1:${port}/redirect`);
            vi.stubEnv("N8N_WEBHOOK_SECRET", "test-webhook-secret");
            const post = await handler();
            expect((await post({ request: makeRequest(validBody) } as APIContext)).status).toBe(503);
            expect(redirects).toBe(1);
            expect(targetRequests).toBe(0);
        } finally {
            await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
        }
    });

    it("fails closed when the mocked verification aborts", async () => {
        vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
        const fetchMock = vi.fn((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
            init.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
        }));
        vi.stubGlobal("fetch", fetchMock);
        const post = await handler();
        expect((await post({ request: makeRequest(validBody) } as APIContext)).status).toBe(403);
        expect(fetchMock.mock.calls[0]?.[1]?.signal?.aborted).toBe(true);
    }, 7000);
});
