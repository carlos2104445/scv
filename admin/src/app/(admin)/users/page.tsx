import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { UserPlus, Shield, ShieldCheck, Pencil, Users } from "lucide-react";

export const dynamic = "force-dynamic";

const roleBadge: Record<string, string> = {
  SUPER_ADMIN: "bg-red-50 text-red-700 border-red-200",
  ADMIN: "bg-purple-50 text-purple-700 border-purple-200",
  EDITOR: "bg-blue-50 text-blue-700 border-blue-200",
  AUTHOR: "bg-emerald-50 text-emerald-700 border-emerald-200",
  FUNDRAISER: "bg-amber-50 text-amber-700 border-amber-200",
  HR: "bg-pink-50 text-pink-700 border-pink-200",
  VIEWER: "bg-neutral-50 text-neutral-600 border-neutral-200",
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, email: true, name: true, role: true, lastLogin: true, createdAt: true },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>User Management</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage staff accounts and role permissions.</p>
        </div>
        <Link href="/users/new" className="btn-primary text-sm py-2">
          <UserPlus className="w-4 h-4" /> Add User
        </Link>
      </div>

      {/* Role legend */}
      <div className="card p-4">
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Role Permissions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          <div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-red-600" /> <strong>Super Admin / Admin</strong> — Full access</div>
          <div className="flex items-center gap-2"><Pencil className="w-3.5 h-3.5 text-blue-600" /> <strong>Editor</strong> — Content, Media, Site settings</div>
          <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-emerald-600" /> <strong>Author</strong> — News, Events, Media</div>
          <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-amber-600" /> <strong>Fundraiser / HR / Viewer</strong> — Limited sections</div>
        </div>
      </div>

      {/* Users table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider">User</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider w-32">Role</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider w-40">Last Login</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider w-40">Created</th>
                <th className="px-5 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-muted transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-brand-dark">{user.name}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">{user.email}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${roleBadge[user.role] || roleBadge.VIEWER}`}>
                      {user.role.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-neutral-500">
                    {user.lastLogin ? formatDateTime(user.lastLogin) : "Never"}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-neutral-500">
                    {formatDateTime(user.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link href={`/users/${user.id}`} className="text-brand-orange hover:underline text-sm font-medium">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
