import { PageHero } from "@/components/blocks/PageHero";
import { PersonSlider } from "@/components/blocks/PersonSlider";
import { getPeopleByCategory } from "@/data/people";

export default function SeniorManagementPage() {
  const members = getPeopleByCategory("SENIOR");

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
