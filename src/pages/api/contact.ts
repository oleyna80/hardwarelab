import type { APIRoute } from "astro";

export const prerender = false;

type FormType = "contact" | "newsletter";
type Locale = "en" | "fr" | "ru" | "de" | "es" | "it";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const IPV4_PATTERN =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
const IPV6_PATTERN = /^[0-9a-f:]+$/i;
const ALLOWED_LOCALES: Locale[] = ["en", "fr", "ru", "de", "es", "it"];
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const TURNSTILE_VERIFY_URL =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const MAX_REQUEST_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const RATE_LIMIT_MAX_KEYS = 1000;
const RATE_LIMIT_STORE = new Map<string, { count: number; resetAt: number }>();
let lastRateLimitGcAt = 0;
const TURNSTILE_ENFORCE =
    sanitizeText(process.env.TURNSTILE_ENFORCE ?? "", 10).toLowerCase() === "true";
const DEFAULT_ALLOWED_ORIGINS_PROD = [
    "https://hardwarelab.org",
    "https://www.hardwarelab.org",
];
const DEFAULT_ALLOWED_ORIGINS_DEV = [
    ...DEFAULT_ALLOWED_ORIGINS_PROD,
    "http://localhost:4321",
    "http://localhost:8081",
];
const DEFAULT_ALLOWED_WEBHOOK_HOSTS = [
    "n8n",
    "n8n.hardwarelab.org",
    "localhost",
    "127.0.0.1",
];

function jsonResponse(
    body: Record<string, unknown>,
    status = 200,
): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

function sanitizeText(value: unknown, maxLen: number): string {
    if (typeof value !== "string") return "";
    return value
        .trim()
        .replace(/[\u0000-\u001F\u007F\u202A-\u202E\u2066-\u2069]/g, "")
        .slice(0, maxLen);
}

function normalizeOrigin(value: string): string | null {
    try {
        const parsed = new URL(value);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
        return parsed.origin;
    } catch {
        return null;
    }
}

function parseAllowedOrigins(): Set<string> {
    const defaults = IS_PRODUCTION
        ? DEFAULT_ALLOWED_ORIGINS_PROD
        : DEFAULT_ALLOWED_ORIGINS_DEV;
    const envOrigins = sanitizeText(process.env.ALLOWED_ORIGINS ?? "", 2000)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

    const parsed = [...defaults, ...envOrigins]
        .map((origin) => normalizeOrigin(origin))
        .filter((origin): origin is string => Boolean(origin))
        .filter((origin) => !IS_PRODUCTION || origin.startsWith("https://"));

    return new Set(parsed);
}

function parseAllowedWebhookHosts(): Set<string> {
    const envHosts = sanitizeText(
        process.env.N8N_WEBHOOK_ALLOWED_HOSTS ?? "",
        2000,
    )
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

    return new Set(
        [...DEFAULT_ALLOWED_WEBHOOK_HOSTS, ...envHosts].map((host) =>
            host.toLowerCase()
        ),
    );
}

function parseAndValidateWebhookUrl(
    value: string,
    allowedHosts: Set<string>,
): URL | null {
    try {
        const parsed = new URL(value);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
        if (parsed.username || parsed.password) return null;
        if (!allowedHosts.has(parsed.hostname.toLowerCase())) return null;
        return parsed;
    } catch {
        return null;
    }
}

function extractOrigin(request: Request): string | null {
    const directOrigin = request.headers.get("origin");
    if (directOrigin) {
        try {
            return new URL(directOrigin).origin;
        } catch {
            return null;
        }
    }

    const referer = request.headers.get("referer");
    if (referer) {
        try {
            return new URL(referer).origin;
        } catch {
            return null;
        }
    }

    return null;
}

function extractClientIp(request: Request): string {
    const normalizeIp = (value: string): string | null => {
        const sanitized = sanitizeText(value, 100);
        if (!sanitized) return null;

        const trimmed = sanitized.replace(/^\[|\]$/g, "");
        const withoutPort = trimmed.includes(":") && !trimmed.includes(".")
            ? trimmed
            : trimmed.replace(/:\d+$/, "");

        if (IPV4_PATTERN.test(withoutPort)) return withoutPort;
        if (withoutPort.includes(":") && IPV6_PATTERN.test(withoutPort)) {
            return withoutPort;
        }

        return null;
    };

    const realIp = normalizeIp(request.headers.get("x-real-ip") ?? "");
    if (realIp) return realIp;

    const forwardedFor = sanitizeText(request.headers.get("x-forwarded-for"), 300);
    if (forwardedFor) {
        for (const ip of forwardedFor.split(",")) {
            const normalized = normalizeIp(ip);
            if (normalized) return normalized;
        }
    }

    const cfConnectingIp = normalizeIp(
        request.headers.get("cf-connecting-ip") ?? "",
    );
    if (cfConnectingIp) return cfConnectingIp;

    return "unknown";
}

async function verifyTurnstileToken(
    token: string,
    remoteIp: string,
): Promise<boolean> {
    const secret = sanitizeText(process.env.TURNSTILE_SECRET_KEY ?? "", 200);
    if (!secret) {
        return !TURNSTILE_ENFORCE;
    }

    const body = new URLSearchParams({
        secret,
        response: token,
    });

    if (remoteIp && remoteIp !== "unknown") {
        body.set("remoteip", remoteIp);
    }

    try {
        const response = await fetch(TURNSTILE_VERIFY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
        });

        if (!response.ok) {
            console.error(
                `[contact-api] turnstile verify request failed with status ${response.status}`,
            );
            return false;
        }

        const data = (await response.json()) as
            | { success?: boolean; "error-codes"?: string[] }
            | null;

        if (!data?.success) {
            const errorCodes = Array.isArray(data?.["error-codes"])
                ? data["error-codes"].join(",")
                : "unknown";
            console.error(
                `[contact-api] turnstile verification failed: ${errorCodes}`,
            );
            return false;
        }

        return true;
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error(`[contact-api] turnstile request error: ${message}`);
        return false;
    }
}

function normalizeFormType(value: unknown): FormType | null {
    if (value === "contact" || value === "newsletter") return value;
    return null;
}

function normalizeLocale(value: unknown): Locale {
    const normalized = sanitizeText(value, 5).toLowerCase();
    return ALLOWED_LOCALES.includes(normalized as Locale)
        ? (normalized as Locale)
        : "en";
}

function cleanupRateLimitStore(now: number): void {
    const shouldCleanup =
        RATE_LIMIT_STORE.size > RATE_LIMIT_MAX_KEYS ||
        now - lastRateLimitGcAt > RATE_LIMIT_WINDOW_MS;
    if (!shouldCleanup) return;

    lastRateLimitGcAt = now;

    for (const [key, state] of RATE_LIMIT_STORE) {
        if (now > state.resetAt) RATE_LIMIT_STORE.delete(key);
    }

    if (RATE_LIMIT_STORE.size <= RATE_LIMIT_MAX_KEYS) return;

    const staleFirst = [...RATE_LIMIT_STORE.entries()].sort(
        (a, b) => a[1].resetAt - b[1].resetAt,
    );
    const overflow = RATE_LIMIT_STORE.size - RATE_LIMIT_MAX_KEYS;

    for (let i = 0; i < overflow; i += 1) {
        const entry = staleFirst[i];
        if (!entry) break;
        RATE_LIMIT_STORE.delete(entry[0]);
    }
}

function isRateLimited(clientIp: string): boolean {
    if (!clientIp) return false;

    const clientKey = clientIp === "unknown" ? "ip:unknown" : `ip:${clientIp}`;
    const now = Date.now();
    cleanupRateLimitStore(now);

    const current = RATE_LIMIT_STORE.get(clientKey);

    if (!current || now > current.resetAt) {
        RATE_LIMIT_STORE.set(clientKey, {
            count: 1,
            resetAt: now + RATE_LIMIT_WINDOW_MS,
        });
        return false;
    }

    current.count += 1;
    return current.count > RATE_LIMIT_MAX_REQUESTS;
}

class PayloadTooLargeError extends Error {
    constructor() {
        super("Payload too large");
        this.name = "PayloadTooLargeError";
    }
}

async function parseJsonBodyWithLimit(
    request: Request,
    maxBytes: number,
): Promise<unknown> {
    if (!request.body) {
        throw new Error("Request body is empty");
    }

    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let totalBytes = 0;
    let rawBody = "";

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;

        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
            throw new PayloadTooLargeError();
        }

        rawBody += decoder.decode(value, { stream: true });
    }

    rawBody += decoder.decode();
    if (!rawBody.trim()) {
        throw new Error("Request body is empty");
    }

    return JSON.parse(rawBody) as unknown;
}

export const POST: APIRoute = async ({ request }) => {
    const contentType = sanitizeText(request.headers.get("content-type"), 100).toLowerCase();
    if (!contentType.includes("application/json")) {
        return jsonResponse(
            { success: false, error: "Unsupported content type" },
            415,
        );
    }

    const contentLengthRaw = sanitizeText(request.headers.get("content-length"), 20);
    if (contentLengthRaw) {
        const contentLength = Number(contentLengthRaw);
        if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BODY_BYTES) {
            return jsonResponse(
                { success: false, error: "Payload too large" },
                413,
            );
        }
    }

    const allowedOrigins = parseAllowedOrigins();
    const requestOrigin = extractOrigin(request);

    if (!requestOrigin || !allowedOrigins.has(requestOrigin)) {
        return jsonResponse({ success: false, error: "Forbidden" }, 403);
    }

    const secFetchSite = sanitizeText(request.headers.get("sec-fetch-site"), 20).toLowerCase();
    if (
        secFetchSite &&
        secFetchSite !== "same-origin" &&
        secFetchSite !== "same-site"
    ) {
        return jsonResponse({ success: false, error: "Forbidden" }, 403);
    }

    const clientIp = extractClientIp(request);
    if (isRateLimited(clientIp)) {
        return jsonResponse(
            {
                success: false,
                error: "Too many requests. Please try again later.",
            },
            429,
        );
    }

    let body: unknown;
    try {
        body = await parseJsonBodyWithLimit(request, MAX_REQUEST_BODY_BYTES);
    } catch (error) {
        if (error instanceof PayloadTooLargeError) {
            return jsonResponse(
                { success: false, error: "Payload too large" },
                413,
            );
        }

        return jsonResponse(
            { success: false, error: "Invalid JSON payload" },
            400,
        );
    }

    if (!body || typeof body !== "object") {
        return jsonResponse(
            { success: false, error: "Request payload is required" },
            400,
        );
    }

    const payload = body as Record<string, unknown>;
    const formType = normalizeFormType(payload.form_type);
    const email = sanitizeText(payload.email, 254).toLowerCase();
    const nameRaw = sanitizeText(payload.name, 100);
    const messageRaw = sanitizeText(payload.message, 2000);
    const botField = sanitizeText(payload.bot_field, 500);
    const locale = normalizeLocale(payload.locale);
    const turnstileToken = sanitizeText(payload.turnstile_token, 4096);

    if (botField.length > 0) {
        return jsonResponse({ success: true });
    }

    const turnstileSecret = sanitizeText(
        process.env.TURNSTILE_SECRET_KEY ?? "",
        200,
    );

    if (TURNSTILE_ENFORCE) {
        if (!turnstileSecret) {
            console.error(
                "[contact-api] Missing runtime env var: TURNSTILE_SECRET_KEY",
            );
            return jsonResponse(
                { success: false, error: "Server configuration error" },
                500,
            );
        }

        if (!turnstileToken) {
            return jsonResponse(
                { success: false, error: "Captcha validation is required" },
                400,
            );
        }

        const turnstileValid = await verifyTurnstileToken(turnstileToken, clientIp);
        if (!turnstileValid) {
            return jsonResponse(
                { success: false, error: "Captcha validation failed" },
                403,
            );
        }
    } else if (turnstileSecret && turnstileToken) {
        const turnstileValid = await verifyTurnstileToken(turnstileToken, clientIp);
        if (!turnstileValid) {
            return jsonResponse(
                { success: false, error: "Captcha validation failed" },
                403,
            );
        }
    }

    if (!formType) {
        return jsonResponse(
            { success: false, error: "Unsupported form type" },
            400,
        );
    }

    if (!email || !EMAIL_PATTERN.test(email)) {
        return jsonResponse(
            { success: false, error: "A valid email is required" },
            400,
        );
    }

    if (formType === "contact" && (!nameRaw || !messageRaw)) {
        return jsonResponse(
            { success: false, error: "Name and message are required" },
            400,
        );
    }

    const metadataInput =
        payload.metadata && typeof payload.metadata === "object"
            ? (payload.metadata as Record<string, unknown>)
            : {};
    const sourcePage =
        sanitizeText(metadataInput.source_page, 500) ||
        sanitizeText(request.headers.get("referer"), 500) ||
        null;

    const n8nWebhookUrlRaw = sanitizeText(process.env.N8N_WEBHOOK_URL ?? "", 2000);
    const n8nWebhookAllowedHosts = parseAllowedWebhookHosts();
    const n8nWebhookUrl = parseAndValidateWebhookUrl(
        n8nWebhookUrlRaw,
        n8nWebhookAllowedHosts,
    );
    const webhookSecrets = [
        sanitizeText(process.env.N8N_WEBHOOK_SECRET ?? "", 200),
        sanitizeText(process.env.N8N_WEBHOOK_SECRET_FALLBACK ?? "", 200),
    ]
        .filter((secret): secret is string => Boolean(secret))
        .filter((secret, index, list) => list.indexOf(secret) === index);

    if (!n8nWebhookUrl || webhookSecrets.length === 0) {
        console.error(
            "[contact-api] Invalid runtime env vars: N8N_WEBHOOK_URL host must be allowlisted and at least one webhook secret is required",
        );
        return jsonResponse(
            { success: false, error: "Server configuration error" },
            500,
        );
    }

    const webhookPayload = {
        form_type: formType,
        name: formType === "newsletter" ? null : nameRaw,
        email,
        message: formType === "newsletter" ? null : messageRaw,
        bot_field: botField,
        locale,
        metadata: {
            source_page: sourcePage,
            ip: clientIp,
            user_agent:
                sanitizeText(request.headers.get("user-agent"), 500) || "unknown",
        },
    };

    try {
        let lastStatus: number | null = null;

        for (let i = 0; i < webhookSecrets.length; i += 1) {
            const webhookSecret = webhookSecrets[i];
            if (!webhookSecret) continue;

            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);

            try {
                const webhookResponse = await fetch(n8nWebhookUrl.toString(), {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Webhook-Secret": webhookSecret,
                    },
                    body: JSON.stringify(webhookPayload),
                    signal: controller.signal,
                });

                if (webhookResponse.ok) {
                    return jsonResponse({ success: true });
                }

                lastStatus = webhookResponse.status;
                const isAuthFailure =
                    webhookResponse.status === 401 || webhookResponse.status === 403;

                if (isAuthFailure && i < webhookSecrets.length - 1) {
                    console.warn(
                        "[contact-api] webhook auth failed with primary secret, retrying with fallback",
                    );
                    continue;
                }

                console.error(
                    `[contact-api] n8n webhook responded with status ${webhookResponse.status}`,
                );
                return jsonResponse(
                    { success: false, error: "Webhook delivery failed" },
                    502,
                );
            } finally {
                clearTimeout(timeout);
            }
        }

        console.error(
            `[contact-api] webhook delivery failed after all secrets; last status=${lastStatus ?? "unknown"}`,
        );
        return jsonResponse(
            { success: false, error: "Webhook delivery failed" },
            502,
        );
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.error(`[contact-api] webhook request failed: ${message}`);
        return jsonResponse(
            {
                success: false,
                error: "Server is temporarily unavailable",
            },
            503,
        );
    }
};
