"use client";

import { PageHero } from "@/components/blocks/PageHero";
import { PersonGrid } from "@/components/blocks/PersonGrid";
import { getPeopleByCategory } from "@/data/people";

export default function SeniorManagementPage() {
  const members = getPeopleByCategory("senior");
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
          <PersonGrid people={members} />
        </div>
      </section>
    </>
  );
}
