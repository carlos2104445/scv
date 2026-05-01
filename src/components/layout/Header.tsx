"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ChevronDown,
  Heart,
  Phone,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, siteSettings } from "@/data/site-settings";
import { MobileMenu } from "./MobileMenu";

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
      <div className="bg-[#F5E6E1] text-brand-dark text-xs hidden xl:block">
        <div className="mx-auto max-w-[1440px] px-6 2xl:px-10 flex items-center justify-between py-1.5">
          <div className="flex items-center gap-4 text-brand-dark/80">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href={siteSettings.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href={siteSettings.socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href={siteSettings.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href={siteSettings.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
            
            {/* Phone */}
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>{siteSettings.contact.phones[0].number}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 text-brand-dark/80 font-medium">
            {navigation.topBar.map((item, index) => (
              <div key={item.href} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className="hover:text-brand-orange transition-colors"
                >
                  {item.label}
                </Link>
                {index < navigation.topBar.length - 1 && (
                  <span className="text-brand-dark/30 text-[10px] mx-0.5">|</span>
                )}
              </div>
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
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-6 2xl:px-10">
          <div className="flex items-center justify-between h-16 xl:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <Image
                src="/images/logo.jpg"
                alt="Selam Children's Village Logo"
                width={200}
                height={60}
                className="h-11 xl:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-0.5 xl:gap-1 2xl:gap-2" role="navigation" aria-label="Main navigation">
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
                      "flex items-center gap-1 whitespace-nowrap px-2.5 xl:px-3 2xl:px-4 py-2 rounded-lg text-[15px] xl:text-base font-medium transition-all duration-200",
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
                          "w-3.5 h-3.5 transition-transform duration-200 shrink-0",
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
                                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] transition-all duration-200 whitespace-nowrap",
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
                                      className="flex items-center px-3 py-1.5 rounded-lg text-xs text-neutral-600 hover:text-brand-orange hover:bg-brand-orange-50 transition-all whitespace-nowrap"
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
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/search"
                className="p-2 rounded-xl text-neutral-600 hover:text-brand-orange hover:bg-brand-orange-50 transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/get-involved/donate"
                className="hidden md:flex btn-primary text-[15px] xl:text-base py-2 px-4 xl:px-5 whitespace-nowrap"
              >
                <Heart className="w-4 h-4" />
                Donate Now
              </Link>
              <button
                className="xl:hidden p-2 rounded-xl text-neutral-600 hover:text-brand-orange hover:bg-brand-orange-50 transition-all"
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
