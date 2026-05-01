import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PeopleTable } from "./PeopleTable";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = {
  BOARD: "Executive Board Members",
  SENIOR: "Senior Management Team",
  EXTENDED: "Extended Management Team",
  SWITZERLAND: "Board Switzerland",
};

const categoryOrder = ["BOARD", "SENIOR", "EXTENDED", "SWITZERLAND"];

export default async function PeoplePage() {
  const people = await prisma.person.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  const grouped = people.reduce((acc, p) => {
    (acc[p.category] = acc[p.category] || []).push(p);
    return acc;
  }, {} as Record<string, typeof people>);

  // Sort groups by defined category order
  const sortedGroups = categoryOrder
    .filter((cat) => grouped[cat])
    .map((cat) => ({ category: cat, label: categoryLabels[cat] || cat, members: grouped[cat] }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>People</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage team members and leadership. Click a name to edit, use arrows to reorder.</p>
        </div>
        <Link href="/content/people/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Person</Link>
      </div>
      {sortedGroups.map(({ category, label, members }) => (
        <PeopleTable key={category} members={members} categoryLabel={label} />
      ))}
      {people.length === 0 && <div className="card p-12 text-center text-neutral-400 text-sm">No team members yet</div>}
    </div>
  );
}
