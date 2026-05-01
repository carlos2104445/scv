import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementPopup } from "@/components/global/AnnouncementPopup";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Revalidate layout every 60 seconds

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch active announcement from DB
  const announcement = await prisma.announcement.findFirst({
    where: { isActive: true },
    orderBy: { updatedAt: "desc" },
  }).catch(() => null); // Gracefully handle if table doesn't exist yet

  const popupConfig = announcement
    ? announcement.type === "image"
      ? {
          type: "image" as const,
          desktopImageUrl: announcement.desktopImageUrl || "",
          mobileImageUrl: announcement.mobileImageUrl || announcement.desktopImageUrl || "",
          alt: announcement.imageAlt || "Announcement",
          linkUrl: announcement.linkUrl || undefined,
        }
      : {
          type: "text" as const,
          title: announcement.title || "",
          body: announcement.body || "",
          ctaLabel: announcement.ctaLabel || undefined,
          ctaUrl: announcement.ctaUrl || undefined,
        }
    : null;

  return (
    <>
      {popupConfig && (
        <AnnouncementPopup
          enabled={true}
          config={popupConfig}
          cooldownMs={announcement!.cooldownHours > 0 ? announcement!.cooldownHours * 3600000 : 0}
          storageKey={`scv-ann-${announcement!.id}`}
        />
      )}
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
