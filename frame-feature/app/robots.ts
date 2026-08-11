import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/blog/new",
          "/gallery/new",
          "/work/new",
          "/api/*",
        ],
      },
    ],
    sitemap: [
      "https://framefeature.com/sitemap.xml",
      "https://framefeature.in/sitemap.xml",
    ],
  };
}
