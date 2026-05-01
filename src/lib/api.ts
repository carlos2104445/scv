const API = process.env.ADMIN_API_URL || "https://dashboard.kitchen251.tech/api/v1";

async function fetchAPI<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${API}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HeroSlide {
  id: string; image: string; title: string | null; subtitle: string | null;
  description: string | null; ctaLabel: string | null; ctaUrl: string | null;
  ctaSecLabel: string | null; ctaSecUrl: string | null; gradient: string | null;
  order: number;
}

export interface ImpactStat {
  id: string; label: string; value: number; suffix: string | null; order: number;
}

export interface ProjectKpi { id: string; label: string; value: number; suffix: string | null; order: number; }

export interface Project {
  id: string; title: string; slug: string; category: string;
  excerpt: string | null; description: string | null; body: string;
  services: { title: string; description: string }[] | null;
  sdgs: number[]; coverImage: string | null; order: number;
  kpis: ProjectKpi[];
}

export interface Department {
  id: string; name: string; slug: string; shortTitle: string;
  description: string; body: string | null;
  services: { title: string; description: string }[] | null;
  image: string | null; highlights: string[]; order: number;
}

export interface Person {
  id: string; name: string; role: string; category: string;
  photo: string | null; bio: string | null; order: number;
}

export interface NewsArticle {
  id: string; title: string; slug: string; publishDate: string;
  coverImage: string | null; excerpt: string | null; body?: string;
  category: string; tags: string[]; featured: boolean;
}

export interface EventItem {
  id: string; title: string; slug: string; startsAt: string;
  endsAt: string | null; location: string | null; body: string;
  coverImage: string | null;
}

export interface Testimonial {
  id: string; name: string; photo: string | null; role: string | null;
  quote: string; order: number;
}

export interface Partner {
  id: string; name: string; logo: string | null; url: string | null;
  type: string; order: number;
}

export interface Page {
  id: string; title: string; slug: string; heroImage: string | null;
  body: string; seoTitle: string | null; seoDesc: string | null;
  seoImage: string | null;
}

export interface TimelineEntry {
  id: string; year: string; title: string; body: string;
  image: string | null; order: number;
}

export interface BankAccount {
  id: string; bankName: string; branch: string | null; accountName: string;
  accountNumber: string; currency: string; swiftCode: string | null;
  instructions: string | null; logo: string | null; order: number;
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const r = await fetchAPI<{ data: HeroSlide[] }>("/hero-slides");
  return r.data;
}

export async function getImpactStats(): Promise<ImpactStat[]> {
  const r = await fetchAPI<{ data: ImpactStat[] }>("/impact-stats");
  return r.data;
}

export async function getProjects(): Promise<Project[]> {
  const r = await fetchAPI<{ data: Project[] }>("/projects");
  return r.data;
}

export async function getDepartments(): Promise<Department[]> {
  const r = await fetchAPI<{ data: Department[] }>("/departments");
  return r.data;
}

export async function getPeople(): Promise<Person[]> {
  const r = await fetchAPI<{ data: Person[] }>("/people");
  return r.data;
}

export async function getNews(limit = 20): Promise<{ data: NewsArticle[]; total: number }> {
  return fetchAPI(`/news?limit=${limit}`);
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const r = await fetchAPI<{ data: NewsArticle }>(`/news/${slug}`);
  return r.data ?? null;
}

export async function getEvents(): Promise<EventItem[]> {
  const r = await fetchAPI<{ data: EventItem[] }>("/events");
  return r.data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const r = await fetchAPI<{ data: Testimonial[] }>("/testimonials");
  return r.data;
}

export async function getPartners(): Promise<Partner[]> {
  const r = await fetchAPI<{ data: Partner[] }>("/partners");
  return r.data;
}

export async function getTimeline(): Promise<TimelineEntry[]> {
  const r = await fetchAPI<{ data: TimelineEntry[] }>("/timeline");
  return r.data;
}

export async function getSettings(): Promise<Record<string, string>> {
  return fetchAPI("/settings");
}

export async function getPage(slug: string): Promise<Page | null> {
  const r = await fetchAPI<{ data: Page }>(`/pages/${slug}`).catch(() => null);
  return r?.data ?? null;
}

export async function getBankAccounts(): Promise<BankAccount[]> {
  const r = await fetchAPI<{ data: BankAccount[] }>("/bank-accounts");
  return r.data;
}

export function getPeopleByCategory(people: Person[], category: string) {
  return people
    .filter((p) => p.category === category)
    .sort((a, b) => a.order - b.order);
}
