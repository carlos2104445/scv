import { Page } from "@/lib/api";
import { PageHero } from "@/components/blocks/PageHero";
import { marked } from "marked";

export async function GenericPage({ page, breadcrumbs }: { page: Page; breadcrumbs?: { label: string; href: string }[] }) {
  const content = await marked.parse(page.body || "");

  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.seoDesc || ""}
        breadcrumbs={breadcrumbs || [{ label: page.title, href: `/${page.slug}` }]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto prose prose-lg prose-brand">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </section>
    </>
  );
}
