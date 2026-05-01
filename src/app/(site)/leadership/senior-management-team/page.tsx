import { PageHero } from "@/components/blocks/PageHero";
import { PersonSlider } from "@/components/blocks/PersonSlider";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function SeniorManagementPage() {
  const members = await prisma.person.findMany({
    where: { category: "SENIOR", status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHero
        title="Senior Management Team"
        subtitle="The core leadership team driving day-to-day operations and strategic initiatives."
        breadcrumbs={[
          { label: "Leadership", href: "/leadership" },
          { label: "Senior Management Team", href: "/leadership/senior-management-team" },
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
