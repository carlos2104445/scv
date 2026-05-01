import { PageHero } from "@/components/blocks/PageHero";
import { PersonSlider } from "@/components/blocks/PersonSlider";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ExtendedManagementPage() {
  const members = await prisma.person.findMany({
    where: { category: "EXTENDED", status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHero
        title="Extended Management Team"
        subtitle="Experienced managers supporting organizational operations across all departments."
        breadcrumbs={[
          { label: "Leadership", href: "/leadership" },
          { label: "Extended Management", href: "/leadership/extended-management-team" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <PersonSlider people={members} />
        </div>
      </section>
    </>
  );
}
