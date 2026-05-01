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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar 
        collapsed={collapsed} 
        onToggleDesktop={() => setCollapsed(!collapsed)} 
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <Topbar 
        collapsed={collapsed} 
        onToggleMobile={() => setMobileOpen(!mobileOpen)}
      />
      <main
        className={cn(
          "pt-16 min-h-screen transition-all duration-300 w-full",
          collapsed ? "md:pl-16" : "md:pl-64",
          "pl-0"
        )}
      >
        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
