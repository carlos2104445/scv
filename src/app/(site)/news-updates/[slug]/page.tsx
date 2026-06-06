import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { getNewsArticle, getRelatedArticles } from "@/data/news";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      type: "article",
      publishedTime: article.date,
      images: [{ url: article.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsArticle(slug);
  if (!article) return notFound();

  const related = getRelatedArticles(slug, 3);
  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <>
      <PageHero
        title={article.title}
        breadcrumbs={[
          { label: "News", href: "/news-updates" },
          { label: article.title, href: `/news-updates/${slug}` },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            {/* Date badge */}
            <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-medium">
                {article.category}
              </span>
            </div>

            {/* Featured image */}
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>

            {/* Article body */}
            <div className="prose prose-lg prose-neutral max-w-none">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-10 pt-6 border-t border-neutral-200">
              <Link
                href="/news-updates"
                className="flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to News
              </Link>
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="mt-16 max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-dark mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/news-updates/${r.slug}`}
                    className="group block card-base hover-lift"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-neutral-500 mb-1">
                        {new Date(r.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="text-sm font-bold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-2">
                        {r.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1 text-brand-orange text-xs font-semibold">
                        Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
