import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import {
  UserCheck, Mail, Briefcase, AtSign, Newspaper, FolderKanban,
  CalendarDays, Plus, ArrowRight, Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    volunteerCount,
    contactCount,
    jobCount,
    subscriberCount,
    newsCount,
    projectCount,
    recentVolunteers,
    recentContacts,
  ] = await Promise.all([
    prisma.volunteerApplication.count({ where: { status: "NEW" } }),
    prisma.contactMessage.count({ where: { status: "UNREAD" } }),
    prisma.job.count({ where: { status: "OPEN" } }),
    prisma.subscriber.count(),
    prisma.news.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.volunteerApplication.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
  ]);

  const kpis = [
    { label: "Open Applications", value: volunteerCount, icon: UserCheck, color: "text-blue-600 bg-blue-50", href: "/inbox/volunteers" },
    { label: "Unread Messages", value: contactCount, icon: Mail, color: "text-emerald-600 bg-emerald-50", href: "/inbox/contacts" },
    { label: "Active Jobs", value: jobCount, icon: Briefcase, color: "text-purple-600 bg-purple-50", href: "/content/jobs" },
    { label: "Subscribers", value: subscriberCount, icon: AtSign, color: "text-amber-600 bg-amber-50", href: "/inbox/subscribers" },
  ];

  const quickActions = [
    { label: "New Post", href: "/content/news/new", icon: Newspaper },
    { label: "Add Project", href: "/content/projects/new", icon: FolderKanban },
    { label: "Add Event", href: "/content/events/new", icon: CalendarDays },
    { label: "Post Job", href: "/content/jobs/new", icon: Briefcase },
  ];

  const activity = [
    ...recentVolunteers.map((v) => ({ type: "volunteer" as const, label: `${v.firstName} ${v.lastName}`, sub: "applied as volunteer", date: v.createdAt, href: "/inbox/volunteers" })),
    ...recentContacts.map((c) => ({ type: "contact" as const, label: c.name, sub: c.subject, date: c.createdAt, href: "/inbox/contacts" })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-1">Welcome back. Here&apos;s what&apos;s happening.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="kpi-card hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-brand-orange group-hover:translate-x-1 transition-all" />
            </div>
            <p className="text-2xl font-bold text-brand-dark mt-3">{kpi.value}</p>
            <p className="text-xs text-neutral-500 font-medium">{kpi.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Recent Activity</h3>
            <Clock className="w-4 h-4 text-neutral-400" />
          </div>
          <div className="divide-y divide-border">
            {activity.length === 0 ? (
              <div className="px-5 py-8 text-center text-neutral-400 text-sm">No recent activity</div>
            ) : (
              activity.map((item, i) => (
                <Link key={i} href={item.href} className="flex items-center gap-3 px-5 py-3 hover:bg-surface-muted transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === "volunteer" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                    {item.type === "volunteer" ? <UserCheck className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{item.label}</p>
                    <p className="text-xs text-neutral-500 truncate">{item.sub}</p>
                  </div>
                  <span className="text-[10px] text-neutral-400 shrink-0">{formatDateTime(item.date)}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions + Stats */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface-muted hover:bg-brand-orange-50 hover:text-brand-orange transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center group-hover:border-brand-orange/30 transition-colors">
                    <a.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold mb-3">Content Stats</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Published News</span>
                <span className="font-semibold">{newsCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Active Projects</span>
                <span className="font-semibold">{projectCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">Total Subscribers</span>
                <span className="font-semibold">{subscriberCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
