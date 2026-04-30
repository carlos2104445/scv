"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Phone,
  Heart,
  Users,
  Mail,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, siteSettings } from "@/data/site-settings";
import { MobileMenu } from "./MobileMenu";

const topBarIcons: Record<string, React.ReactNode> = {
  "Job Openings": <Briefcase className="w-3.5 h-3.5" />,
  Donate: <Heart className="w-3.5 h-3.5" />,
  "Become a Volunteer": <Users className="w-3.5 h-3.5" />,
  "Contact Us": <Mail className="w-3.5 h-3.5" />,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menuTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const handleMenuEnter = (label: string) => {
    if (menuTimeout.current) clearTimeout(menuTimeout.current);
    setActiveMenu(label);
  };

  const handleMenuLeave = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-brand-dark text-white text-sm hidden lg:block">
        <div className="container-xl flex items-center justify-between py-2">
          <div className="flex items-center gap-2 text-neutral-300">
            <Phone className="w-3.5 h-3.5" />
            <span>{siteSettings.contact.phones[0].number}</span>
            <span className="mx-2 text-neutral-600">|</span>
            <Mail className="w-3.5 h-3.5" />
            <span>{siteSettings.contact.email}</span>
          </div>
          <div className="flex items-center gap-1">
            {navigation.topBar.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
                  item.label === "Donate"
                    ? "bg-brand-orange text-white hover:bg-brand-orange-dark"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
                )}
              >
                {topBarIcons[item.label]}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5"
            : "bg-white"
        )}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image
                src="/images/logo.jpg"
                alt="Selam Children's Village Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navigation.main.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && handleMenuEnter(item.label)
                  }
                  onMouseLeave={handleMenuLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === item.href || pathname.startsWith(item.href + "/")
                        ? "text-brand-orange"
                        : "text-neutral-700 hover:text-brand-orange hover:bg-brand-orange-50"
                    )}
                    aria-expanded={
                      item.children ? activeMenu === item.label : undefined
                    }
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeMenu === item.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeMenu === item.label && (
                    <div
                      className="absolute top-full left-0 pt-2 animate-fade-in"
                      onMouseEnter={() => handleMenuEnter(item.label)}
                      onMouseLeave={handleMenuLeave}
                    >
                      <div className="bg-white rounded-2xl shadow-xl shadow-black/10 border border-neutral-100 p-2 min-w-[240px]">
                        {item.children.map((child) => (
                          <div key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200",
                                pathname === child.href
                                  ? "bg-brand-orange-50 text-brand-orange font-medium"
                                  : "text-neutral-700 hover:bg-neutral-50 hover:text-brand-dark"
                              )}
                            >
                              {child.label}
                            </Link>
                            {/* Nested sub-menu */}
                            {"children" in child &&
                              (
                                child as {
                                  children: { label: string; href: string }[];
                                }
                              ).children && (
                                <div className="ml-4 pl-3 border-l-2 border-brand-orange-100">
                                  {(
                                    child as {
                                      children: {
                                        label: string;
                                        href: string;
                                      }[];
                                    }
                                  ).children.map((sub) => (
                                    <Link
                                      key={sub.href}
                                      href={sub.href}
                                      className="flex items-center px-3 py-1.5 rounded-lg text-xs text-neutral-600 hover:text-brand-orange hover:bg-brand-orange-50 transition-all"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/search"
                className="p-2 rounded-xl text-neutral-600 hover:text-brand-orange hover:bg-brand-orange-50 transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/get-involved/donate"
                className="hidden md:flex btn-primary text-sm py-2 px-5"
              >
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
              <button
                className="lg:hidden p-2 rounded-xl text-neutral-600 hover:text-brand-orange hover:bg-brand-orange-50 transition-all"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
