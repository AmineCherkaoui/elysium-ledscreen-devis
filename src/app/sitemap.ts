import { getProducts } from "@/lib/api/products";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const { products } = await getProducts({ limit: 100 });

  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/produits/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1.0,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produits`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/devis`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "never",
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...productUrls];
}
