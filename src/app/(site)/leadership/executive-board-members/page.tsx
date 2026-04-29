"use client";

import { PageHero } from "@/components/blocks/PageHero";
import { PersonGrid } from "@/components/blocks/PersonGrid";
import { getPeopleByCategory } from "@/data/people";

export default function ExecutiveBoardPage() {
  const members = getPeopleByCategory("board");
  return (
    <>
      <PageHero
        title="Executive Board Members"
        subtitle="Dedicated leaders providing strategic governance and oversight for Selam Children's Village."
        breadcrumbs={[
          { label: "Leadership", href: "/leadership" },
          { label: "Executive Board Members", href: "/leadership/executive-board-members" },
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
