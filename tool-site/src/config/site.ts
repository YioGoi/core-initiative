import { brands } from "@core-initiative/common/config";
const origin = new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN?.trim() || brands.tool.origin);
if (!["http:", "https:"].includes(origin.protocol) || origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash) {
  throw new Error("NEXT_PUBLIC_SITE_ORIGIN must be an HTTP(S) origin without credentials, a path, query or fragment.");
}
const local = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname) || origin.hostname.endsWith(".localhost");
const preview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";
export const site = {
  ...brands.tool,
  origin: origin.origin,
  indexable: process.env.NODE_ENV === "production" && !local && !preview,
};
