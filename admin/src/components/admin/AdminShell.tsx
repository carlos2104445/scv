"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, FileText, Newspaper, FolderKanban, GraduationCap,
  Users, CalendarDays, Briefcase, Image, BookOpen, MessageSquareQuote,
  Handshake, Inbox, Mail, UserCheck, ClipboardList, AtSign,
  Landmark, Settings, SlidersHorizontal, ImagePlay, Megaphone,
  ChevronDown, Menu, X, LogOut, Search, Bell,
} from "lucide-react";

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    label: "Content", icon: FileText,
    children: [
      { label: "Pages", href: "/content/pages" },
      { label: "News", href: "/content/news" },
      { label: "Projects", href: "/content/projects" },
      { label: "Departments", href: "/content/departments" },
      { label: "People", href: "/content/people" },
      { label: "Events", href: "/content/events" },
      { label: "Jobs", href: "/content/jobs" },
      { label: "Gallery", href: "/content/gallery" },
      { label: "Publications", href: "/content/publications" },
      { label: "Testimonials", href: "/content/testimonials" },
      { label: "Partners", href: "/content/partners" },
    ],
  },
  {
    label: "Inbox", icon: Inbox,
    children: [
      { label: "Volunteers", href: "/inbox/volunteers" },
      { label: "Contacts", href: "/inbox/contacts" },
      { label: "Job Applications", href: "/inbox/job-applications" },
      { label: "Subscribers", href: "/inbox/subscribers" },
    ],
  },
  {
    label: "Donations", icon: Landmark,
    children: [
      { label: "Bank Accounts", href: "/donations/bank-accounts" },
      { label: "Settings", href: "/donations/settings" },
    ],
  },
  {
    label: "Site", icon: SlidersHorizontal,
    children: [
      { label: "Settings", href: "/site/settings" },
      { label: "Hero Slides", href: "/site/hero-slides" },
      { label: "Announcement", href: "/site/announcement" },
    ],
  },
  { label: "Media", href: "/media", icon: Image },
];

const navIcons: Record<string, React.ElementType> = {
  Pages: FileText, News: Newspaper, Projects: FolderKanban, Departments: GraduationCap,
  People: Users, Events: CalendarDays, Jobs: Briefcase, Gallery: Image,
  Publications: BookOpen, Testimonials: MessageSquareQuote, Partners: Handshake,
  Volunteers: UserCheck, Contacts: Mail, "Job Applications": ClipboardList,
  Subscribers: AtSign, "Bank Accounts": Landmark, Settings: Settings,
  "Hero Slides": ImagePlay, Announcement: Megaphone, Media: Image,
};

function SidebarItem({ item, collapsed, onClick }: { item: NavItem; collapsed: boolean; onClick?: () => void }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = item.href ? pathname === item.href : item.children?.some((c) => pathname.startsWith(c.href));

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
          isActive ? "bg-white/10 text-white shadow-sm ring-1 ring-white/5" : "text-zinc-400 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon className="w-5 h-5 shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
          isActive ? "bg-white/10 text-white shadow-sm ring-1 ring-white/5" : "text-zinc-400 hover:bg-white/5 hover:text-white"
        )}
      >
        <item.icon className="w-5 h-5 shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
          </>
        )}
      </button>
      {open && !collapsed && item.children && (
        <div className="ml-5 pl-3 border-l border-white/10 mt-1.5 space-y-1">
          {item.children.map((child) => {
            const Icon = navIcons[child.label] || FileText;
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClick}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                  pathname === child.href || pathname.startsWith(child.href + "/")
                    ? "text-brand-orange bg-brand-orange/10 font-semibold"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ 
  collapsed, 
  onToggleDesktop, 
  mobileOpen, 
  onCloseMobile 
}: { 
  collapsed: boolean; 
  onToggleDesktop: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity" 
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-sidebar flex flex-col border-r border-sidebar-hover z-50 transition-transform duration-300 shadow-xl md:shadow-none",
          collapsed ? "md:w-16" : "md:w-64",
          "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/5">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2.5" onClick={onCloseMobile}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">SCV Admin</p>
                <p className="text-neutral-500 text-[10px]">CMS Dashboard</p>
              </div>
            </Link>
          )}
          <button onClick={onToggleDesktop} className="hidden md:block p-1.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all">
            {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-4 h-4" />}
          </button>
          <button onClick={onCloseMobile} className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:bg-white/5 hover:text-white transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <SidebarItem key={item.label} item={item} collapsed={collapsed} onClick={onCloseMobile} />
          ))}
        </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
    </>
  );
}

export function Topbar({ collapsed, onToggleMobile }: { collapsed: boolean; onToggleMobile: () => void }) {
  const { data: session } = useSession();
  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 md:px-6 z-30 transition-all shadow-sm",
        collapsed ? "md:left-16" : "md:left-64",
        "left-0"
      )}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-xl text-neutral-500 hover:bg-surface-muted transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-muted text-neutral-500 text-sm hover:bg-neutral-200 transition-all">
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline text-[10px] bg-white px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl text-neutral-500 hover:bg-surface-muted transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-orange" />
        </button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center text-white text-xs font-bold">
            {session?.user?.name?.[0] || "A"}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-brand-dark leading-tight">{session?.user?.name || "Admin"}</p>
            <p className="text-[10px] text-neutral-500">{session?.user?.email || ""}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
