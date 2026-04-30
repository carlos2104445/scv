import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await hash("Admin@SCV2025!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@selamchildrenvillage.org" },
    update: {},
    create: {
      email: "admin@selamchildrenvillage.org",
      password: hashedPassword,
      name: "SCV Admin",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Seed site settings
  const settings = [
    { key: "site_title", value: "Selam Children's Village" },
    { key: "site_tagline", value: "Transforming Lives. Four Decades of Nurturing Hope." },
    { key: "contact_address", value: "Kotebe, near Hana Mariam Church, Addis Ababa, Ethiopia" },
    { key: "contact_pobox", value: "P.O. Box 8075" },
    { key: "contact_email", value: "info@selamchildrenvillage.org" },
    { key: "contact_phones", value: JSON.stringify([
      { label: "Head Office", number: "+251-116-471052" },
      { label: "Resource Mobilization", number: "+251-116-460007" },
      { label: "Registrar", number: "+251-990-504779" },
      { label: "Dean", number: "+251-116-472517" },
    ])},
    { key: "social_facebook", value: "https://www.facebook.com/selamchildrensvillage" },
    { key: "social_instagram", value: "https://www.instagram.com/selamchildrensvillage" },
    { key: "social_twitter", value: "https://twitter.com/selamchildren" },
    { key: "social_youtube", value: "https://www.youtube.com/@selamchildrensvillage" },
    { key: "map_lat", value: "9.0274" },
    { key: "map_lng", value: "38.8316" },
    { key: "chapa_etb_url", value: "https://chapa.link/donation/view/DN-7e5lUodNN6lL" },
    { key: "chapa_usd_url", value: "https://chapa.link/donation/view/DN-SIQR7rmPsCxL" },
    { key: "gofundme_url", value: "https://www.gofundme.com/f/together-we-can-help-most-vulnerable-children" },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }
  console.log("✅ Site settings seeded");

  // Seed bank accounts
  const banks = [
    { bankName: "Cooperative Bank of Oromia", accountName: "Selam Children's Village", accountNumber: "1234567890", branch: "Kotebe Branch", currency: "ETB", order: 1 },
    { bankName: "Bank of Abyssinia", accountName: "Selam Children's Village", accountNumber: "0987654321", branch: "Main Branch", currency: "ETB", order: 2 },
    { bankName: "Commercial Bank of Ethiopia", accountName: "Selam Children's Village", accountNumber: "1000234567890", branch: "Kotebe Branch", currency: "ETB/USD", order: 3 },
    { bankName: "Tele Birr", accountName: "Selam Children's Village", accountNumber: "0911234567", branch: "Mobile Money", currency: "ETB", order: 4 },
  ];
  for (const b of banks) {
    await prisma.bankAccount.create({ data: b });
  }
  console.log("✅ Bank accounts seeded");

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
