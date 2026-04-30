import { SectionHeading } from "@/components/blocks/SectionHeading";
import { TeamGroup } from "./TeamCards";
import { prisma } from "@/lib/prisma";

export async function TeamSection() {
  const people = await prisma.person.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { order: "asc" },
  });

  const boardMembers = people.filter((p) => p.category === "BOARD");
  const seniorManagement = people.filter((p) => p.category === "SENIOR");
  const extendedManagement = people.filter((p) => p.category === "EXTENDED");

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-xl">
        <SectionHeading
          badge="Our Team"
          title="Leadership & Management"
          subtitle="Dedicated leaders committed to our mission of transforming lives and nurturing hope."
        />

        <div className="mt-14">
          <TeamGroup title="Executive Board Members" people={boardMembers} />
          <TeamGroup title="Senior Management Team" people={seniorManagement} />
          <TeamGroup
            title="Extended Management Team"
            people={extendedManagement}
          />
        </div>
      </div>
    </section>
  );
}
