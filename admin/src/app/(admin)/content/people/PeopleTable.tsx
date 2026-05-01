"use client";

import { ArrowUp, ArrowDown, Pencil } from "lucide-react";
import Link from "next/link";
import { reorderPerson } from "@/actions/people";
import { useTransition } from "react";

interface Person {
  id: string;
  name: string;
  role: string;
  photo: string | null;
  order: number;
  status: string;
}

interface PeopleTableProps {
  members: Person[];
  categoryLabel: string;
}

export function PeopleTable({ members, categoryLabel }: PeopleTableProps) {
  const [pending, startTransition] = useTransition();

  const handleMove = (id: string, direction: "up" | "down") => {
    startTransition(() => reorderPerson(id, direction));
  };

  return (
    <div className="card">
      <div className="px-5 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-sm">{categoryLabel} ({members.length})</h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-500 uppercase">Member</th>
            <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-500 uppercase w-20">Order</th>
            <th className="px-5 py-2.5 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
            <th className="px-5 py-2.5 text-right text-xs font-semibold text-neutral-500 uppercase w-36">Actions</th>
          </tr>
        </thead>
        <tbody className={`divide-y divide-border ${pending ? "opacity-50 pointer-events-none" : ""}`}>
          {members.map((m, idx) => (
            <tr key={m.id} className="hover:bg-surface-muted transition-colors group">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {m.name[0]}
                    </div>
                  )}
                  <div>
                    <Link href={`/content/people/${m.id}`} className="font-medium text-brand-dark hover:text-brand-orange text-sm">
                      {m.name}
                    </Link>
                    <p className="text-xs text-neutral-500">{m.role}</p>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3 text-sm text-neutral-500">{m.order}</td>
              <td className="px-5 py-3">
                <span className={m.status === "PUBLISHED" ? "badge-published" : "badge-draft"}>
                  {m.status.toLowerCase()}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => handleMove(m.id, "up")}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-dark hover:bg-neutral-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMove(m.id, "down")}
                    disabled={idx === members.length - 1}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-dark hover:bg-neutral-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <Link
                    href={`/content/people/${m.id}`}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-brand-orange hover:bg-brand-orange-50 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
