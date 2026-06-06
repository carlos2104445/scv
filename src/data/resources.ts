/**
 * Resources data — annual reports, audit reports, newsletters/magazines.
 *
 * Scraped from the live WordPress site. When a CMS is connected later,
 * replace the static arrays with API calls returning the same shapes.
 */

export interface Resource {
  /** Unique identifier */
  id: string;
  /** Display title */
  title: string;
  /** Year of the report / publication */
  year: number;
  /** Category for grouping */
  category: "annual-report" | "audit-report" | "newsletter" | "magazine";
  /** Short description */
  description: string;
  /** External link (e.g. PDF on the live site) — null if not available */
  downloadUrl: string | null;

  /* ── SEO (used on the parent listing page) ─────────── */
  seoTitle?: string;
  seoDescription?: string;
}

// ---------------------------------------------------------------------------
// Annual Reports (from live site: 2019 – 2024)
// ---------------------------------------------------------------------------

export const annualReports: Resource[] = [
  {
    id: "ar-2024",
    title: "Annual Report 2024",
    year: 2024,
    category: "annual-report",
    description: "Comprehensive overview of SCV's 2024 activities, programs, financial performance, and impact.",
    downloadUrl: null,
  },
  {
    id: "ar-2023",
    title: "Annual Report 2023",
    year: 2023,
    category: "annual-report",
    description: "Highlights from 2023 including the five-year strategic plan launch and Sheno center opening.",
    downloadUrl: null,
  },
  {
    id: "ar-2022",
    title: "Annual Report 2022",
    year: 2022,
    category: "annual-report",
    description: "Report covering SCV's recovery and growth post-pandemic with expanded vocational training programs.",
    downloadUrl: null,
  },
  {
    id: "ar-2021",
    title: "Annual Report 2021",
    year: 2021,
    category: "annual-report",
    description: "Annual report documenting SCV's continued services and adaptations during the pandemic.",
    downloadUrl: null,
  },
  {
    id: "ar-2020",
    title: "Annual Report 2020",
    year: 2020,
    category: "annual-report",
    description: "Overview of SCV's response to COVID-19 and maintained operations during challenging times.",
    downloadUrl: null,
  },
  {
    id: "ar-2019",
    title: "Annual Report 2019",
    year: 2019,
    category: "annual-report",
    description: "Report documenting SCV's pre-pandemic program achievements and community impact.",
    downloadUrl: null,
  },
];

// ---------------------------------------------------------------------------
// Audit Reports (from live site: 2015 – 2024)
// ---------------------------------------------------------------------------

export const auditReports: Resource[] = [
  {
    id: "audit-2024",
    title: "SCV Audit Report 2024",
    year: 2024,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2024.",
    downloadUrl: null,
  },
  {
    id: "audit-2023",
    title: "SCV Audit Report 2023",
    year: 2023,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2023.",
    downloadUrl: null,
  },
  {
    id: "audit-2022",
    title: "SCV Audit Report 2022",
    year: 2022,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2022.",
    downloadUrl: null,
  },
  {
    id: "audit-2021",
    title: "SCV Audit Report 2021",
    year: 2021,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2021.",
    downloadUrl: null,
  },
  {
    id: "audit-2020",
    title: "SCV Audit Report 2020",
    year: 2020,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2020.",
    downloadUrl: null,
  },
  {
    id: "audit-2019",
    title: "SCV Audit Report 2019",
    year: 2019,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2019.",
    downloadUrl: null,
  },
  {
    id: "audit-2018",
    title: "SCV Audit Report 2018",
    year: 2018,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2018.",
    downloadUrl: null,
  },
  {
    id: "audit-2017",
    title: "SCV Audit Report 2017",
    year: 2017,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2017.",
    downloadUrl: null,
  },
  {
    id: "audit-2016",
    title: "SCV Audit Report 2016",
    year: 2016,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2016.",
    downloadUrl: null,
  },
  {
    id: "audit-2015",
    title: "SCV Audit Report 2015",
    year: 2015,
    category: "audit-report",
    description: "Externally audited financial statements for fiscal year 2015.",
    downloadUrl: null,
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getAnnualReports(): Resource[] {
  return annualReports;
}

export function getAuditReports(): Resource[] {
  return auditReports;
}

export function getResourcesByCategory(category: Resource["category"]): Resource[] {
  return [...annualReports, ...auditReports].filter((r) => r.category === category);
}
