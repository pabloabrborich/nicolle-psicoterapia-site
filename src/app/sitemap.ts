import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { resources } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/adultos", "/familias-crianza", "/talleres-y-grupos", "/agenda", "/recursos", "/privacidad", "/terminos"];
  return [
    ...routes.map((route) => ({ url: `${env.siteUrl}${route}`, lastModified: new Date() })),
    ...resources.map((resource) => ({ url: `${env.siteUrl}/recursos/${resource.slug}`, lastModified: new Date() }))
  ];
}
