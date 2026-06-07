import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { hash } from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin User ────────────────────────────────────────────────────────
  const hashedPassword = await hash("Admin@SCV2025!", 12);
  await prisma.user.upsert({
    where: { email: "admin@selamchildrenvillage.org" },
    update: {},
    create: { email: "admin@selamchildrenvillage.org", password: hashedPassword, name: "SCV Admin", role: "SUPER_ADMIN" },
  });
  console.log("✅ Admin user");

  // ─── Site Settings ─────────────────────────────────────────────────────
  const settings: { key: string; value: string }[] = [
    { key: "site_title", value: "Selam Children's Village" },
    { key: "site_tagline", value: "Transforming Lives. Four Decades of Nurturing Hope." },
    { key: "site_description", value: "Selam Children's Village is an Ethiopian non-profit organization established in 1986 by the visionary social worker Mrs. Tsehay Roschli." },
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
    { key: "vision", value: "To see a society where every child and youth is cared for, educated, and empowered to become a self-reliant and productive citizen." },
    { key: "mission", value: "To provide comprehensive and holistic care, education, and vocational training to orphaned, abandoned, and vulnerable children and youth, empowering them to become productive members of society." },
    { key: "core_values", value: JSON.stringify(["Accountability", "Compassionate", "Professionalism", "Responsiveness", "Stewardship", "Team Spirit", "Transparency"]) },
    { key: "founder_narrative", value: "Selam Children's Village was established by Ms. Tsehay Roschli, a visionary and mother of many. It was founded in 1986. At that time, Mrs. Tsehay was living in Switzerland when severe famine and drought struck Ethiopia, especially in the northern part. Many Ethiopians died, and a large number of children lost their parents." },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s });
  }
  console.log("✅ Site settings (" + settings.length + ")");

  // ─── People ────────────────────────────────────────────────────────────
  await prisma.person.deleteMany();
  const people = [
    { name: "Mr. Olani Gizaw", role: "Chairperson", category: "BOARD" as const, bio: "Leading the executive board with decades of experience in organizational governance and social welfare.", order: 1 },
    { name: "Prof. Wondwosen Tesfaye", role: "Deputy Chairman", category: "BOARD" as const, bio: "Academic leader bringing research-driven insights to the organization's strategic direction.", order: 2 },
    { name: "Dr. Teshome Lemma", role: "Board Member", category: "BOARD" as const, bio: "Contributing medical expertise and community health perspectives to organizational decisions.", order: 3 },
    { name: "Mr. Fasil Sisay", role: "Board Member", category: "BOARD" as const, bio: "Providing strategic guidance on financial sustainability and organizational growth.", order: 4 },
    { name: "Eng. Kassa Hailegiorgis", role: "Board Member", category: "BOARD" as const, bio: "Engineering professional offering technical insights for infrastructure development.", order: 5 },
    { name: "Mr. Taye Nigatu", role: "Board Member", category: "BOARD" as const, bio: "Experienced professional supporting governance and community outreach initiatives.", order: 6 },
    { name: "Mr. Tesfaye Adege", role: "Board Member", category: "BOARD" as const, bio: "Dedicated board member with a focus on child welfare and educational excellence.", order: 7 },
    { name: "Mr. Solomon Chali", role: "Executive Director", category: "SENIOR" as const, bio: "Leading the day-to-day operations of Selam Children's Village with a passion for child welfare and organizational excellence.", order: 1 },
    { name: "Mr. Nigussie Eshetie", role: "CYC Director", category: "SENIOR" as const, bio: "Overseeing the Children, Youth, and Community Support programs ensuring quality care and development.", order: 2 },
    { name: "Mr. Tibebu Leta", role: "Dean, TVET College", category: "SENIOR" as const, bio: "Managing the Technical and Vocational Education Training College, fostering skills development for youth.", order: 3 },
    { name: "Mr. Assefa G/medhin", role: "Manager", category: "EXTENDED" as const, bio: "Contributing to the operational management and program implementation across the organization.", order: 1 },
    { name: "Mr. Assefa Misganaw", role: "Manager", category: "EXTENDED" as const, bio: "Supporting organizational management with expertise in program coordination.", order: 2 },
    { name: "Cmdr. Teshome Fekade", role: "Manager", category: "EXTENDED" as const, bio: "Bringing disciplined leadership and administrative skills to organizational management.", order: 3 },
    { name: "Mr. Getachew Alito", role: "Manager", category: "EXTENDED" as const, bio: "Managing key operational areas with dedication to organizational goals.", order: 4 },
    { name: "Mr. Girmay Moges", role: "Manager", category: "EXTENDED" as const, bio: "Contributing to strategic planning and program execution.", order: 5 },
    { name: "Mr. Leoulseged Kassahun", role: "Manager", category: "EXTENDED" as const, bio: "Supporting organizational development and community engagement.", order: 6 },
    { name: "Mrs. Zufan G/egziabher", role: "Manager", category: "EXTENDED" as const, bio: "Providing leadership in program management and stakeholder coordination.", order: 7 },
  ];
  for (const p of people) {
    await prisma.person.create({ data: { ...p, status: "PUBLISHED" } });
  }
  console.log("✅ People (" + people.length + ")");

  // ─── Hero Slides ───────────────────────────────────────────────────────
  await prisma.heroSlide.deleteMany();
  const heroSlides = [
    { image: "/images/hero/slide-1.png", title: "Transforming Lives.", subtitle: "Four Decades of Nurturing Hope.", description: "Since 1986, Selam Children's Village has been providing comprehensive care, education, and vocational training to Ethiopia's most vulnerable children and youth.", ctaLabel: "Learn More", ctaUrl: "/about", ctaSecLabel: "Donate Now", ctaSecUrl: "/get-involved/donate", gradient: "from-brand-dark/80 via-brand-dark/50 to-transparent", order: 0 },
    { image: "/images/hero/slide-2.png", title: "Invest in Children,", subtitle: "Harvest a Generation.", description: "Your support helps us provide education, healthcare, and a loving home to over 255 children in our care.", ctaLabel: "Our Programs", ctaUrl: "/what-we-do", ctaSecLabel: "Get Involved", ctaSecUrl: "/get-involved/how-to-help", gradient: "from-brand-orange/70 via-brand-dark/40 to-transparent", order: 1 },
    { image: "/images/hero/slide-3.png", title: "Building Futures", subtitle: "Through Education & Training.", description: "Our TVET College offers vocational training across 11 departments, empowering youth with the skills they need to thrive.", ctaLabel: "TVET College", ctaUrl: "/technical-vocational-training", ctaSecLabel: "View Projects", ctaSecUrl: "/all-projects", gradient: "from-brand-dark/80 via-brand-dark/40 to-transparent", order: 2 },
  ];
  for (const h of heroSlides) {
    await prisma.heroSlide.create({ data: h });
  }
  console.log("✅ Hero slides (" + heroSlides.length + ")");

  // ─── Impact Stats ──────────────────────────────────────────────────────
  await prisma.impactStat.deleteMany();
  const stats = [
    { label: "Children in Care", value: 255, suffix: "+", order: 0 },
    { label: "Years of Service", value: 40, suffix: "", order: 1 },
    { label: "TVET Departments", value: 11, suffix: "", order: 2 },
    { label: "Active Programs", value: 15, suffix: "+", order: 3 },
    { label: "Patients Annually", value: 3200, suffix: "+", order: 4 },
    { label: "Recent Graduates", value: 182, suffix: "", order: 5 },
  ];
  for (const s of stats) {
    await prisma.impactStat.create({ data: s });
  }
  console.log("✅ Impact stats (" + stats.length + ")");

  // ─── Testimonials ──────────────────────────────────────────────────────
  await prisma.testimonial.deleteMany();
  const testimonials = [
    { name: "Abebe Tadesse", role: "Former SCV Resident, Now Software Engineer", quote: "Selam Children's Village gave me more than a home — it gave me a future. The education and love I received there shaped who I am today. I am forever grateful.", order: 0, featured: true },
    { name: "Tigist Mengistu", role: "TVET Graduate, Small Business Owner", quote: "The vocational training I received at Selam's TVET College changed my life. I learned garment production and now run my own tailoring business, supporting my family.", order: 1, featured: true },
    { name: "Dr. Martha Ayele", role: "Partner Organization Director", quote: "Working with Selam Children's Village has been an inspiring journey. Their holistic approach to child care and community development is truly a model for Ethiopia.", order: 2, featured: true },
    { name: "Hans Mueller", role: "Selam Charity Switzerland, Board Member", quote: "The dedication of the team at Selam Children's Village is remarkable. Every visit shows us the tangible impact of our support — educated children becoming leaders.", order: 3, featured: true },
  ];
  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log("✅ Testimonials (" + testimonials.length + ")");

  // ─── Partners ──────────────────────────────────────────────────────────
  await prisma.partner.deleteMany();
  const partners = ["USAID", "UNICEF", "World Bank", "EU Delegation", "GIZ", "Swiss Agency", "MasterCard Foundation", "Save the Children", "SOS Children's Villages", "Plan International", "Selam Charity Switzerland", "Good Neighbors"];
  for (let i = 0; i < partners.length; i++) {
    await prisma.partner.create({ data: { name: partners[i], order: i, type: "Funder" } });
  }
  console.log("✅ Partners (" + partners.length + ")");

  // ─── Timeline Entries ──────────────────────────────────────────────────
  await prisma.timelineEntry.deleteMany();
  const timeline = [
    { year: "1986", title: "Foundation of Selam Children's Village", body: "Mrs. Tsehay Roschli establishes Selam Children's Village in Addis Ababa to care for orphaned and vulnerable children.", image: "/images/history/1986.jpg", order: 0 },
    { year: "1987", title: "Official Inauguration", body: "The Village is officially inaugurated and begins its core mission of providing a loving home and education.", image: "/images/history/1987.jpg", order: 1 },
    { year: "1989", title: "Selam Technical and Vocational College", body: "Selam Technical & Vocational Education Training College (STVC) is established to equip youth with marketable skills.", image: "/images/history/1989.jpg", order: 2 },
    { year: "1990", title: "Selam Primary Schools & Family Homes", body: "Construction of the first family-model homes begins, and Selam Primary Schools are established.", image: "/images/history/1990.jpg", order: 3 },
    { year: "1994", title: "Selam High School", body: "Selam High School is opened to continue the educational journey of our students through higher grades.", image: "/images/history/1994.jpg", order: 4 },
    { year: "2003", title: "Second Children's Village at Kotebe", body: "Expansion continues with the establishment of a second Children's Village in Kotebe.", image: "/images/history/2003.jpg", order: 5 },
    { year: "2010", title: "Youth Programs", body: "Youth Support Program is launched to help grown children transition to independent, productive lives.", image: "/images/history/2010.jpg", order: 6 },
    { year: "2014", title: "Daycare Center", body: "A Daycare Center is established to support early childhood development and assist working mothers.", image: "/images/history/2014.jpg", order: 7 },
    { year: "2020", title: "Community Outreach Expansion", body: "Major expansion of community programs including elderly women support and women's economic empowerment.", image: "/images/history/2020.jpg", order: 8 },
    { year: "2025", title: "Continuing the Legacy", body: "Celebrating four decades of transforming lives, with over 255 children in care and thousands of TVET graduates.", image: "/images/history/2025.jpg", order: 9 },
  ];
  for (const t of timeline) {
    await prisma.timelineEntry.create({ data: t });
  }
  console.log("✅ Timeline (" + timeline.length + ")");

  // ─── Bank Accounts ─────────────────────────────────────────────────────
  const bankCount = await prisma.bankAccount.count();
  if (bankCount === 0) {
    const banks = [
      { bankName: "Cooperative Bank of Oromia", accountName: "Selam Children's Village", accountNumber: "1234567890", branch: "Kotebe Branch", currency: "ETB", order: 1 },
      { bankName: "Bank of Abyssinia", accountName: "Selam Children's Village", accountNumber: "0987654321", branch: "Main Branch", currency: "ETB", order: 2 },
      { bankName: "Commercial Bank of Ethiopia", accountName: "Selam Children's Village", accountNumber: "1000234567890", branch: "Kotebe Branch", currency: "ETB/USD", order: 3 },
      { bankName: "Tele Birr", accountName: "Selam Children's Village", accountNumber: "0911234567", branch: "Mobile Money", currency: "ETB", order: 4 },
    ];
    for (const b of banks) { await prisma.bankAccount.create({ data: b }); }
    console.log("✅ Bank accounts (4)");
  }

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
