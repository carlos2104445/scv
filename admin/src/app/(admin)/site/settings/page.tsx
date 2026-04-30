import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Save } from "lucide-react";

export const dynamic = "force-dynamic";

async function updateSettings(formData: FormData) {
  "use server";
  const fields = [
    "site_title", "site_tagline", "contact_address", "contact_pobox",
    "contact_email", "social_facebook", "social_instagram", "social_twitter",
    "social_youtube", "map_lat", "map_lng",
  ];
  for (const key of fields) {
    const value = formData.get(key) as string;
    if (value !== null) {
      await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
    }
  }
  // Handle phones separately (textarea, one per line → JSON array)
  const phonesRaw = formData.get("contact_phones") as string;
  if (phonesRaw) {
    const phones = phonesRaw.split("\n").map(line => {
      const [label, number] = line.split(":").map(s => s.trim());
      return { label: label || "", number: number || label || "" };
    }).filter(p => p.number);
    await prisma.siteSetting.upsert({ where: { key: "contact_phones" }, update: { value: JSON.stringify(phones) }, create: { key: "contact_phones", value: JSON.stringify(phones) } });
  }
  revalidatePath("/site/settings");
}

export default async function SiteSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const get = (key: string) => settings.find(s => s.key === key)?.value || "";
  const phones = (() => { try { return JSON.parse(get("contact_phones")) as { label: string; number: string }[]; } catch { return []; } })();
  const phonesText = phones.map(p => `${p.label}: ${p.number}`).join("\n");

  return (
    <div className="space-y-6">
      <div><h1>Site Settings</h1><p className="text-neutral-500 text-sm mt-1">Configure global site settings.</p></div>
      <form action={updateSettings} className="max-w-3xl space-y-6">
        <div className="card p-6 space-y-5">
          <h3 className="font-semibold border-b border-border pb-3">General</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">Site Title</label><input name="site_title" defaultValue={get("site_title")} className="input-field" /></div>
            <div><label className="label">Tagline</label><input name="site_tagline" defaultValue={get("site_tagline")} className="input-field" /></div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="font-semibold border-b border-border pb-3">Contact Info</h3>
          <div><label className="label">Address</label><input name="contact_address" defaultValue={get("contact_address")} className="input-field" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">P.O. Box</label><input name="contact_pobox" defaultValue={get("contact_pobox")} className="input-field" /></div>
            <div><label className="label">Email</label><input name="contact_email" defaultValue={get("contact_email")} className="input-field" /></div>
          </div>
          <div><label className="label">Phone Numbers (one per line, format: Label: Number)</label><textarea name="contact_phones" defaultValue={phonesText} rows={4} className="input-field font-mono text-sm resize-none" /></div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="font-semibold border-b border-border pb-3">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">Facebook</label><input name="social_facebook" defaultValue={get("social_facebook")} className="input-field" /></div>
            <div><label className="label">Instagram</label><input name="social_instagram" defaultValue={get("social_instagram")} className="input-field" /></div>
            <div><label className="label">Twitter / X</label><input name="social_twitter" defaultValue={get("social_twitter")} className="input-field" /></div>
            <div><label className="label">YouTube</label><input name="social_youtube" defaultValue={get("social_youtube")} className="input-field" /></div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h3 className="font-semibold border-b border-border pb-3">Map</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="label">Latitude</label><input name="map_lat" defaultValue={get("map_lat")} className="input-field" /></div>
            <div><label className="label">Longitude</label><input name="map_lng" defaultValue={get("map_lng")} className="input-field" /></div>
          </div>
        </div>

        <button type="submit" className="btn-primary"><Save className="w-4 h-4" /> Save All Settings</button>
      </form>
    </div>
  );
}
