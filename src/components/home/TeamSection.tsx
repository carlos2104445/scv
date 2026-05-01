import { SectionHeading } from "@/components/blocks/SectionHeading";
import { PersonSlider } from "@/components/blocks/PersonSlider";
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

        <div className="mt-14 space-y-16">
          {boardMembers.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center tracking-tight">
                Executive Board Members
              </h3>
              <PersonSlider people={boardMembers} />
            </div>
          )}
          {seniorManagement.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center tracking-tight">
                Senior Management Team
              </h3>
              <PersonSlider people={seniorManagement} />
            </div>
          )}
          {extendedManagement.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-brand-dark mb-6 text-center tracking-tight">
                Extended Management Team
              </h3>
              <PersonSlider people={extendedManagement} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
