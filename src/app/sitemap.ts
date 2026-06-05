import type { MetadataRoute } from "next";
import { projects, majorProjects } from "@/data/projects";
import { departments } from "@/data/departments";

const BASE = "https://www.selamchildrenvillage.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about/who-we-are`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about/our-history`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about/vision-mission-core-values`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    { url: `${BASE}/what-we-do`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/what-we-do/children-youth-community-support`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/all-projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/technical-vocational-training`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/get-involved/how-to-help`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/get-involved/donate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/get-involved/become-a-volunteer`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/get-involved/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/news-updates`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/event-calendar`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/job-openings`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/resources/publication`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/resources/newsletter-magazine`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/resources/annual-report`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/resources/audit-report`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/resources/policies-guidelines`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = [...projects, ...majorProjects].map((p) => ({
    url: `${BASE}/what-we-do/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const deptRoutes: MetadataRoute.Sitemap = departments.map((d) => ({
    url: `${BASE}/technical-vocational-training/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...deptRoutes];
}
