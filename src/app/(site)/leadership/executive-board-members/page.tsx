import { PageHero } from "@/components/blocks/PageHero";
import { PersonSlider } from "@/components/blocks/PersonSlider";
import { getPeopleByCategory } from "@/data/people";

export default function ExecutiveBoardPage() {
  const members = getPeopleByCategory("BOARD");

  return (
    <>
      <PageHero
        badge="Leadership"
        title="Executive Board Members"
        subtitle="Dedicated leaders providing strategic governance and oversight for Selam Children's Village."
        breadcrumbs={[
          { label: "Leadership", href: "/leadership" },
          { label: "Executive Board Members", href: "/leadership/executive-board-members" },
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
