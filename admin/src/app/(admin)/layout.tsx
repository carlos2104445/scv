"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar, Topbar } from "@/components/admin/AdminShell";
import { Providers } from "@/components/Providers";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Providers>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <Topbar collapsed={collapsed} />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300",
          collapsed ? "pl-16" : "pl-64"
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
