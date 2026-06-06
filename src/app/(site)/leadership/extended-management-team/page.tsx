import { PageHero } from "@/components/blocks/PageHero";
import { PersonGrid } from "@/components/blocks/PersonGrid";
import { getPeopleByCategory } from "@/data/people";

export default function ExtendedManagementPage() {
  const members = getPeopleByCategory("EXTENDED");

  return (
    <>
      <PageHero
        badge="Leadership"
        title="Extended Management Team"
        subtitle="Experienced managers supporting organizational operations across all departments."
        breadcrumbs={[
          { label: "Leadership", href: "/leadership" },
          { label: "Extended Management", href: "/leadership/extended-management-team" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <PersonGrid people={members} />
        </div>
      </section>
    </>
  );
}
