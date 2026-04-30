import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteSettings } from "@/data/site-settings";

/* Inline SVG social icons since lucide-react no longer ships them */
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Projects", href: "/all-projects" },
  { label: "TVET College", href: "/technical-vocational-training" },
  { label: "News & Updates", href: "/news-updates" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/event-calendar" },
];

const getInvolvedLinks = [
  { label: "Donate", href: "/get-involved/donate" },
  { label: "Become a Volunteer", href: "/get-involved/become-a-volunteer" },
  { label: "Job Openings", href: "/job-openings" },
  { label: "How to Help", href: "/get-involved/how-to-help" },
  { label: "Contact Us", href: "/get-involved/contact-us" },
];

const socialLinks = [
  { icon: FacebookIcon, href: siteSettings.socials.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: siteSettings.socials.instagram, label: "Instagram" },
  { icon: TwitterIcon, href: siteSettings.socials.twitter, label: "Twitter / X" },
  { icon: YoutubeIcon, href: siteSettings.socials.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-auto">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-brand-orange to-brand-orange-dark">
        <div className="container-xl py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-normal">
                Invest in Children, Harvest a Generation
              </h2>
              <p className="mt-2 text-white/80 max-w-lg">
                Your support transforms lives. Join us in nurturing hope and
                building futures for vulnerable children in Ethiopia.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/get-involved/donate"
                className="inline-flex items-center gap-2 bg-white text-brand-orange px-6 py-3 rounded-xl font-bold hover:bg-neutral-100 transition-all shadow-lg"
              >
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
              <Link
                href="/get-involved/become-a-volunteer"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Volunteer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: About */}
          <div>
            <div className="mb-5 bg-white p-2 rounded-xl inline-block">
              <Image
                src="/images/logo.jpg"
                alt="Selam Children's Village Logo"
                width={150}
                height={45}
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
              Established in 1986 by Mrs. Tsehay Roschli, Selam Children&apos;s Village
              provides comprehensive care, education, and vocational training to
              orphaned and vulnerable children in Ethiopia.
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-neutral-400 hover:bg-brand-orange hover:text-white transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 tracking-normal">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 tracking-normal">Get Involved</h3>
            <ul className="space-y-2.5">
              {getInvolvedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-brand-orange transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-base font-bold text-white mb-5 tracking-normal">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-neutral-300">
                    {siteSettings.contact.address}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {siteSettings.contact.poBox}
                  </p>
                </div>
              </li>
              {siteSettings.contact.phones.slice(0, 2).map((phone) => (
                <li key={phone.number} className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-orange shrink-0" />
                  <div>
                    <p className="text-xs text-neutral-500">{phone.label}</p>
                    <a
                      href={`tel:${phone.number}`}
                      className="text-sm text-neutral-300 hover:text-brand-orange transition-colors"
                    >
                      {phone.number}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-orange shrink-0" />
                <a
                  href={`mailto:${siteSettings.contact.email}`}
                  className="text-sm text-neutral-300 hover:text-brand-orange transition-colors"
                >
                  {siteSettings.contact.email}
                </a>
              </li>
            </ul>

            {/* Map */}
            <div className="mt-5 rounded-xl overflow-hidden border border-white/10 h-32">
              <iframe
                src={siteSettings.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Selam Children's Village Location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <p>
              © {new Date().getFullYear()} Selam Children&apos;s Village. All
              rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/resources/policies-guidelines"
                className="hover:text-neutral-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/resources/policies-guidelines"
                className="hover:text-neutral-300 transition-colors"
              >
                Terms of Use
              </Link>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
