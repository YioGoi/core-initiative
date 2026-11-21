import { brands } from "@core-initiative/common/config";

export const siteId = "core";
export const site = {
  ...brands[siteId],
  origin: process.env.NEXT_PUBLIC_SITE_ORIGIN || brands[siteId].origin,
};
