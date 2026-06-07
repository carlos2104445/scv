"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Eye, EyeOff } from "lucide-react";

const ROLES = [
  { value: "SUPER_ADMIN", label: "Super Admin", desc: "Full system access" },
  { value: "ADMIN", label: "Admin", desc: "Full access except system config" },
  { value: "EDITOR", label: "Editor", desc: "Content, media, and site settings" },
  { value: "AUTHOR", label: "Author", desc: "News, events, and media only" },
  { value: "FUNDRAISER", label: "Fundraiser", desc: "Donations and contacts" },
  { value: "HR", label: "HR", desc: "People, jobs, and applications" },
  { value: "VIEWER", label: "Viewer", desc: "Dashboard view only" },
];

interface UserFormProps {
  initialData?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function UserForm({ initialData, action, deleteAction }: UserFormProps) {
  const isEdit = !!initialData;
  const [showPassword, setShowPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/users" className="btn-ghost">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1>{isEdit ? "Edit User" : "Create User"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button
              type="button"
              disabled={deleting}
              className="btn-danger text-sm py-2"
              onClick={async () => {
                if (confirm("Delete this user? This cannot be undone.")) {
                  setDeleting(true);
                  await deleteAction(initialData!.id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" className="btn-primary text-sm py-2">
            <Save className="w-4 h-4" /> {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main fields */}
        <div className="lg:col-span-2 card p-5 space-y-5">
          <div>
            <label className="label">Full Name</label>
            <input name="name" defaultValue={initialData?.name || ""} className="input-field" placeholder="John Doe" required />
          </div>
          <div>
            <label className="label">Email Address</label>
            <input name="email" type="email" defaultValue={initialData?.email || ""} className="input-field" placeholder="user@selamchildrenvillage.org" required />
          </div>
          <div>
            <label className="label">{isEdit ? "New Password (leave blank to keep)" : "Password"}</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input-field pr-10"
                placeholder={isEdit ? "••••••••" : "Min 8 characters"}
                required={!isEdit}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Role selector */}
        <div className="card p-5 space-y-4 h-fit">
          <label className="label">Role</label>
          <div className="space-y-2">
            {ROLES.map((role) => (
              <label
                key={role.value}
                className="flex items-start gap-3 p-3 rounded-xl border border-border hover:bg-surface-muted cursor-pointer transition-colors has-[:checked]:border-brand-orange has-[:checked]:bg-brand-orange/5"
              >
                <input
                  type="radio"
                  name="role"
                  value={role.value}
                  defaultChecked={initialData?.role === role.value || (!initialData && role.value === "EDITOR")}
                  className="mt-0.5 accent-brand-orange"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-dark">{role.label}</p>
                  <p className="text-xs text-neutral-500">{role.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
