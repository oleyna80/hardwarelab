import {
  categorySlugs,
  localizedCategoryLanguages,
  type CategorySlug,
} from "../data/categoryCatalog";

export type Language = "en" | "fr" | "de" | "ru";

export type RouteKind =
  | "home"
  | "review"
  | "build"
  | "category-index"
  | "category-detail"
  | "about"
  | "privacy"
  | "disclosure"
  | "contact"
  | "api"
  | "health"
  | "other";

export interface RouteInfo {
  kind: RouteKind;
  lang: Language;
  isLocalized: boolean;
  isMoneyPage: boolean;
  slug?: string;
  category?: string;
}

const SUPPORTED_LANGS = new Set<Language>(["en", "fr", "de", "ru"]);

function toSegments(pathname: string): string[] {
  const beforeQuery = pathname.split("?")[0] ?? "";
  const clean = beforeQuery.split("#")[0] ?? "";
  return clean.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}

function isLang(value: string): value is Language {
  return SUPPORTED_LANGS.has(value as Language);
}

function isCategorySlug(value: string): value is CategorySlug {
  return categorySlugs.includes(value as CategorySlug);
}

function isLocalizedCategoryLanguage(value: Language): boolean {
  return localizedCategoryLanguages.includes(
    value as (typeof localizedCategoryLanguages)[number],
  );
}

function make(
  kind: RouteKind,
  lang: Language,
  isLocalized: boolean,
  extras?: Pick<RouteInfo, "slug" | "category">,
): RouteInfo {
  const isMoneyPage = kind === "review" || kind === "build" || kind === "category-detail";
  return {
    kind,
    lang,
    isLocalized,
    isMoneyPage,
    ...extras,
  };
}

export function classifyRoute(pathname: string): RouteInfo {
  const segments = toSegments(pathname);

  if (segments.length === 0) return make("home", "en", false);

  const first = segments[0] ?? "";
  const second = segments[1] ?? "";
  const rest = segments.slice(2);

  if (isLang(first)) {
    if (segments.length === 1) return make("home", first, true);
    if (second === "reviews" && rest.length >= 1) {
      return make("review", first, true, { slug: rest.join("/") });
    }
    const category = rest[0];
    if (
      second === "categories" &&
      rest.length === 1 &&
      category &&
      isLocalizedCategoryLanguage(first) &&
      isCategorySlug(category)
    ) {
      return make("category-detail", first, true, { category });
    }
    return make("other", first, true);
  }

  if (first === "reviews" && segments.length >= 2) {
    return make("review", "en", false, { slug: segments.slice(1).join("/") });
  }

  if (first === "builds" && segments.length >= 2) {
    return make("build", "en", false, { slug: segments.slice(1).join("/") });
  }

  if (first === "categories" && segments.length === 1) {
    return make("category-index", "en", false);
  }
  if (first === "categories" && segments.length >= 2) {
    return make("category-detail", "en", false, { category: segments.slice(1).join("/") });
  }

  if (first === "about") return make("about", "en", false);
  if (first === "privacy") return make("privacy", "en", false);
  if (first === "disclosure") return make("disclosure", "en", false);
  if (first === "contact") return make("contact", "en", false);
  if (first === "api") return make("api", "en", false);
  if (first === "health") return make("health", "en", false);

  return make("other", "en", false);
}

export function isMoneyPage(pathname: string): boolean {
  return classifyRoute(pathname).isMoneyPage;
}
