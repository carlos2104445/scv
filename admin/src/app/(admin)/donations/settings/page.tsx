import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ExternalLink, Save } from "lucide-react";

export const dynamic = "force-dynamic";

async function updateDonationSettings(formData: FormData) {
  "use server";
  const keys = ["chapa_etb_url", "chapa_usd_url", "gofundme_url"];
  for (const key of keys) {
    const value = formData.get(key) as string;
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  revalidatePath("/donations/settings");
}

export default async function DonationSettingsPage() {
  const settings = await prisma.siteSetting.findMany({ where: { key: { in: ["chapa_etb_url", "chapa_usd_url", "gofundme_url"] } } });
  const get = (key: string) => settings.find(s => s.key === key)?.value || "";

  return (
    <div className="space-y-6">
      <div><h1>Donation Settings</h1><p className="text-neutral-500 text-sm mt-1">Configure donation links.</p></div>
      <form action={updateDonationSettings} className="card p-6 space-y-5 max-w-2xl">
        <div>
          <label className="label">Chapa ETB Donation URL</label>
          <input name="chapa_etb_url" defaultValue={get("chapa_etb_url")} className="input-field" placeholder="https://chapa.link/..." />
        </div>
        <div>
          <label className="label">Chapa USD Donation URL</label>
          <input name="chapa_usd_url" defaultValue={get("chapa_usd_url")} className="input-field" placeholder="https://chapa.link/..." />
        </div>
        <div>
          <label className="label">GoFundMe URL</label>
          <input name="gofundme_url" defaultValue={get("gofundme_url")} className="input-field" placeholder="https://www.gofundme.com/..." />
        </div>
        <button type="submit" className="btn-primary"><Save className="w-4 h-4" /> Save Settings</button>
      </form>
    </div>
  );
}
