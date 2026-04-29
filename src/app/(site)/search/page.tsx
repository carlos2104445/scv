"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { projects, majorProjects } from "@/data/projects";
import { departments } from "@/data/departments";

interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: string;
}

const searchableItems: SearchItem[] = [
  { title: "About Our Organization", description: "Learn about Selam Children's Village and our four-decade mission.", href: "/about", category: "About" },
  { title: "Our History", description: "Founded in 1986 by Mrs. Tsehay Roschli.", href: "/about/our-history", category: "About" },
  { title: "Vision, Mission & Core Values", description: "Our guiding principles.", href: "/about/vision-mission-core-values", category: "About" },
  { title: "Executive Board Members", description: "Meet our board of directors.", href: "/leadership/executive-board-members", category: "Leadership" },
  { title: "Senior Management Team", description: "Our senior leadership.", href: "/leadership/senior-management-team", category: "Leadership" },
  { title: "Donate", description: "Support our mission via Chapa, bank transfer, or GoFundMe.", href: "/get-involved/donate", category: "Get Involved" },
  { title: "Become a Volunteer", description: "Join our team and make a difference.", href: "/get-involved/become-a-volunteer", category: "Get Involved" },
  { title: "Contact Us", description: "Reach out for inquiries or support.", href: "/get-involved/contact-us", category: "Get Involved" },
  { title: "TVET College", description: "Vocational training across 11 departments.", href: "/technical-vocational-training", category: "Education" },
  { title: "News & Updates", description: "Latest activities and achievements.", href: "/news-updates", category: "News" },
  { title: "Photo Gallery", description: "Visual stories of hope and transformation.", href: "/gallery", category: "Media" },
  { title: "Events", description: "Upcoming events and activities.", href: "/event-calendar", category: "Events" },
  { title: "Job Openings", description: "Career opportunities at SCV.", href: "/job-openings", category: "Careers" },
  { title: "Resources", description: "Publications, reports, and documents.", href: "/resources", category: "Resources" },
  ...projects.map((p) => ({ title: p.title, description: p.excerpt, href: `/what-we-do/${p.slug}`, category: "Programs" })),
  ...majorProjects.map((p) => ({ title: p.title, description: p.excerpt, href: `/what-we-do/${p.slug}`, category: "Projects" })),
  ...departments.map((d) => ({ title: d.shortTitle, description: d.description.slice(0, 100), href: `/technical-vocational-training/${d.slug}`, category: "TVET" })),
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <PageHero title="Search" subtitle="Find what you're looking for." breadcrumbs={[{ label: "Search", href: "/search" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, programs, departments..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-lg"
                autoFocus
              />
            </div>

            {query.trim() && (
              <p className="text-sm text-neutral-500 mb-6">
                {results.length} result{results.length !== 1 && "s"} for &quot;{query}&quot;
              </p>
            )}

            <div className="space-y-3">
              {results.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group block card-base hover-lift p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-brand-orange bg-brand-orange-50 px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <h3 className="mt-2 font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.description}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all shrink-0 mt-6" />
                  </div>
                </Link>
              ))}
            </div>

            {query.trim() && results.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600">No results found. Try different keywords.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
