import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding projects & departments...");

  // ─── Departments ───────────────────────────────────────────────────────
  await prisma.department.deleteMany();
  const departments = [
    { slug: "electrical-and-electronics-technology-department", name: "Electrical & Electronics Technology Department", shortTitle: "Electrical & Electronics", description: "Providing excellent vocational training in Electrical & Electronics.", highlights: ["Industrial electrical installation", "Electronic device repair", "Building wiring systems", "PLC programming basics"], image: "/images/tvet/electrical-and-electronics.jpg", order: 0 },
    { slug: "construction-technology-department", name: "Construction Technology Department", shortTitle: "Construction Technology", description: "Providing excellent vocational training in Construction Technology.", highlights: ["Modern building techniques", "Construction materials", "Blueprint reading", "Site management"], image: "/images/tvet/construction-technology.jpg", order: 1 },
    { slug: "department-of-metal-manufacturing", name: "Department of Metal Manufacturing", shortTitle: "Metal Manufacturing", description: "Providing excellent vocational training in Metal Manufacturing.", highlights: ["Welding & fabrication", "Sheet metal work", "Machine operation", "Quality control"], image: "/images/tvet/metal-manufacturing.jpg", order: 2 },
    { slug: "heavy-duty-vehicles-and-earth-moving-machinery-maintenance-department", name: "Heavy Duty Vehicles & Earth Moving Machinery Maintenance", shortTitle: "Heavy Machinery", description: "Providing excellent vocational training in Heavy Machinery.", highlights: ["Engine diagnostics", "Hydraulic systems", "Preventive maintenance", "Heavy equipment operation"], image: "/images/tvet/heavy-machinery.jpg", order: 3 },
    { slug: "department-of-hotel-and-hospitality", name: "Department of Hotel & Hospitality", shortTitle: "Hotel & Hospitality", description: "Providing excellent vocational training in Hotel & Hospitality.", highlights: ["Hotel management", "Food & beverage service", "Customer relations", "Tourism services"], image: "/images/tvet/hotel-and-hospitality.jpg", order: 4 },
    { slug: "garment-production-department", name: "Garment Production Department", shortTitle: "Garment Production", description: "Providing excellent vocational training in Garment Production.", highlights: ["Pattern making", "Industrial sewing", "Quality control", "Fashion design basics"], image: "/images/tvet/garment-production.jpg", order: 5 },
    { slug: "secretarial-and-office-administration-department", name: "Secretarial & Office Administration Department", shortTitle: "Office Administration", description: "Providing excellent vocational training in Office Administration.", highlights: ["Office management", "Computer applications", "Business communication", "Document management"], image: "/images/tvet/office-administration.jpg", order: 6 },
    { slug: "information-technology-department", name: "Information Technology Department", shortTitle: "Information Technology", description: "Providing excellent vocational training in Information Technology.", highlights: ["Computer hardware", "Software basics", "Networking", "Digital literacy"], image: "/images/tvet/information-technology.jpg", order: 7 },
    { slug: "woodwork-technology-department", name: "Woodwork Technology Department", shortTitle: "Woodwork Technology", description: "Providing excellent vocational training in Woodwork Technology.", highlights: ["Furniture design", "Wood joinery", "Machine woodworking", "Finishing techniques"], image: "/images/tvet/woodwork-technology.jpg", order: 8 },
    { slug: "urban-agriculture-department", name: "Urban Agriculture Department", shortTitle: "Urban Agriculture", description: "Providing excellent vocational training in Urban Agriculture.", highlights: ["Greenhouse management", "Urban farming", "Organic practices", "Small animal husbandry"], image: "/images/tvet/urban-agriculture.jpg", order: 9 },
    { slug: "misale-drivers-training-academy", name: "Misale Drivers Training Academy", shortTitle: "Drivers Training", description: "Providing excellent vocational training in Drivers Training.", highlights: ["Professional driving", "Traffic regulations", "Vehicle maintenance", "Defensive driving"], image: "/images/tvet/drivers-training.jpg", order: 10 },
  ];
  for (const d of departments) {
    await prisma.department.create({ data: { ...d, body: d.description, status: "PUBLISHED" } });
  }
  console.log("✅ Departments (" + departments.length + ")");

  // ─── Projects (CYC + Community) ────────────────────────────────────────
  await prisma.projectKpi.deleteMany();
  await prisma.project.deleteMany();

  const projects = [
    {
      slug: "family-model-village-child-care", title: "Family Model Village", category: "CYC" as const,
      excerpt: "Providing a nurturing family environment for orphaned and vulnerable children through our model village approach.",
      description: "For four decades, Selam Children's Village (SCV) has been a sanctuary for orphaned and vulnerable children.",
      body: "For four decades, Selam Children's Village (SCV) has been a sanctuary for orphaned and vulnerable children. While we successfully began with traditional institutional care in 1986, our commitment to the highest global standards of child psychology led to a major transformation in 2011.\n\nWe proudly transitioned to the Family Model Village Child Care program because we believe every child deserves more than just a facility—they deserve a family.\n\nToday, our children do not live in dormitories; they live in their own homes. Each house provides a warm, family-like environment led by a dedicated foster mother, a foster aunt, and a father figure.",
      services: [{ title: "A Loving Family", description: "Individualized attention and deep psychosocial support to heal from past trauma." }, { title: "Holistic Health", description: "Comprehensive medical care at the Selam Clinic." }, { title: "Empowerment", description: "Life-skills training and education to build confident, independent futures." }],
      coverImage: "/images/projects/family-village.jpg", sdgs: [1, 2, 3, 4, 10], order: 0,
      kpis: [{ label: "Children in Care", value: 255, order: 0 }, { label: "Male", value: 157, order: 1 }, { label: "Female", value: 98, order: 2 }, { label: "House Mothers", value: 12, order: 3 }],
    },
    {
      slug: "day-care", title: "Day Care Center", category: "CYC" as const,
      excerpt: "Quality early childhood development and day care services for children of economically vulnerable working mothers.",
      description: "SCV has established a day care center with the aim of providing service for children (aged 2-4 years old) coming from economically poor women-headed families.",
      body: "SCV has established a day care center with the aim of providing service for children (aged 2-4 years old) coming from economically poor women-headed families.\n\nThe day care center helps mothers by keeping their kids the whole day giving proper care within Selam Day Care facilities, so that the women could freely engage in their daily laborious jobs.",
      services: [{ title: "Full-Day Supervision", description: "Safe and proper care from 8:00 AM to 5:00 PM." }, { title: "Nutritional Support", description: "Three nutritious meals per day from Monday to Saturday." }, { title: "Early Childhood Care", description: "Dedicated support for children aged 2-4." }],
      coverImage: "/images/projects/daycare.jpg", sdgs: [1, 4, 5, 10], order: 1,
      kpis: [{ label: "Children Enrolled", value: 242, order: 0 }, { label: "Male", value: 149, order: 1 }, { label: "Female", value: 93, order: 2 }],
    },
    {
      slug: "youth-support-program", title: "Youth Support Program", category: "CYC" as const,
      excerpt: "Empowering youth through skills training, mentorship, and support to become self-reliant members of society.",
      description: "The Youth Support Department is a cornerstone of the Children, Youth & Community Support Project.",
      body: "The Youth Support Department is a cornerstone of the Children, Youth & Community Support Project. Our mission is to bridge the gap between childhood and adulthood.\n\nTransitioning to independence is a gradual process. Once children reach the age of 18 and demonstrate the necessary maturity they transition into our Semi-Independent Living (SIL) program.\n\nFull integration is achieved once a young person secures a stable job, becomes financially self-reliant, and successfully manages their own life endeavors.",
      services: [{ title: "Financial Assistance", description: "Monthly allowances to manage housing, food, and daily essentials." }, { title: "Social Work Support", description: "Regular follow-ups, orientation, and mentorship." }, { title: "Technical Skill Training", description: "Hands-on vocational paths for immediate career entry." }],
      coverImage: "/images/projects/youth-support.jpg", sdgs: [1, 4, 8, 10], order: 2,
      kpis: [{ label: "Number of Youth", value: 93, order: 0 }, { label: "Male", value: 59, order: 1 }, { label: "Female", value: 34, order: 2 }],
    },
    {
      slug: "school-feeding", title: "School Feeding Program", category: "COMMUNITY" as const,
      excerpt: "Ensuring children receive nutritious meals to support their health and academic performance.",
      description: "There are more than 3000 students and trainees enrolled in Selam Educational institutions.",
      body: "There are more than 3000 students and trainees enrolled in Selam Educational institutions (KG to Technical and Vocational College). The lunch service is provided for students who cannot afford to have one meal per day.\n\nThe aim of this support is to minimize irregular school attendance and malnutrition, which ultimately results in poor academic performance.",
      services: [{ title: "Daily Lunch Service", description: "Providing nutritious daily meals to students facing severe economic hardship." }, { title: "Academic Performance Support", description: "Reducing malnutrition to improve school attendance." }],
      coverImage: "/images/projects/school-feeding.jpg", sdgs: [1, 2, 3, 4], order: 3,
      kpis: [{ label: "Total Children", value: 526, order: 0 }, { label: "Male", value: 260, order: 1 }, { label: "Female", value: 266, order: 2 }],
    },
    {
      slug: "selam-clinic", title: "Health & Clinic Service", category: "CYC" as const,
      excerpt: "Providing essential healthcare services to children, staff, and community members.",
      description: "Established in 1988, Selam Clinic was founded with a vital mission: to provide high-quality healthcare.",
      body: "Established in 1988, Selam Clinic was founded with a vital mission: to provide high-quality healthcare to the children and youth of Selam Children's Village and the surrounding community.\n\nOur facility has evolved into a multi-disciplinary health hub, offering a wide range of essential services.\n\nWe are honored to have been awarded the Green Working License for 2015 E.C.",
      services: [{ title: "Preventative Care", description: "Health education and TB/HIV prevention." }, { title: "Maternal Health", description: "Comprehensive Focused Antenatal Care (FANC)." }, { title: "Diagnostic Excellence", description: "Modern laboratory services, Digital X-ray, and Ultrasound." }, { title: "Dental Care", description: "Professional dental services to children, youth, and community members." }],
      coverImage: "/images/projects/clinic.jpg", sdgs: [3, 10], order: 4,
      kpis: [{ label: "Patients Reached", value: 16688, order: 0 }, { label: "Healthcare Workers", value: 8, order: 1 }],
    },
    {
      slug: "educational-support", title: "Educational Support", category: "COMMUNITY" as const,
      excerpt: "Providing scholarships, materials, and tutoring to protect children from dropping out of school.",
      description: "The Educational Support program is designed to protect children from dropping out of school.",
      body: "The Educational Support program is designed to protect children from dropping out of school. It helps minimize absenteeism and reduces the economic burden on disadvantaged families.\n\nThis program contributes directly to the improvement of children's academic performance by addressing both their material and academic needs.",
      services: [{ title: "Scholarships & Allowances", description: "Providing financial support and monthly allowances." }, { title: "School Materials", description: "Essential stationery, backpacks, and school uniforms." }, { title: "Tutorial Support", description: "After-school tutoring and academic guidance." }],
      coverImage: "/images/projects/education.png", sdgs: [1, 4, 8, 10], order: 5,
      kpis: [{ label: "Students Supported", value: 202, order: 0 }, { label: "Male", value: 114, order: 1 }, { label: "Female", value: 88, order: 2 }],
    },
    {
      slug: "destitute-elderly-women-support", title: "Elderly Women Support", category: "COMMUNITY" as const,
      excerpt: "Providing care, monthly allowances, and work therapy for destitute elderly women.",
      description: "The Elderly Women Support program was designed in 2010 to provide vital services to elderly women.",
      body: "The Elderly Women Support program was designed in 2010 to provide vital services to elderly women who live as widows, are chronically ill, or are HIV positive.\n\nSince these vulnerable elderly women are unable to save earnings for themselves, they are provided with a monthly cash allowance.\n\nAdditionally, handicraft materials are provided so they can engage in work therapy.",
      services: [{ title: "Monthly Allowance", description: "Direct cash assistance for daily living expenses." }, { title: "Work Therapy", description: "Handicraft materials for therapeutic engagement." }],
      coverImage: "/images/projects/elderly-support.jpg", sdgs: [1, 2, 3, 5, 10], order: 6,
      kpis: [{ label: "Total Women Supported", value: 10, order: 0 }],
    },
    {
      slug: "hygiene-kit-support-for-girls", title: "Hygiene Kit for Girls", category: "COMMUNITY" as const,
      excerpt: "Supporting girls' education and dignity by providing essential hygiene kits.",
      description: "A hygiene kit scheme is organized to create a chance for destitute girls to attend classes with full concentration.",
      body: "A hygiene kit (sanitary pads, soaps and hair pomade) scheme is organized to create a chance for destitute girls to attend classes with full concentration and gain self-confidence.\n\nThis support has a huge impact in minimizing class absenteeism for girls during their menstruation period.",
      services: [{ title: "Essential Hygiene Kits", description: "Sanitary pads, soaps, and hair pomade." }, { title: "Reducing Absenteeism", description: "Ensuring girls don't miss school." }],
      coverImage: "/images/projects/hygiene-kit.jpg", sdgs: [3, 4, 5, 6], order: 7,
      kpis: [{ label: "Total Girls Supported", value: 300, order: 0 }],
    },
    {
      slug: "women-economic-empowerment", title: "Women Economic Empowerment", category: "COMMUNITY" as const,
      excerpt: "Empowering disadvantaged women through basic business skills and startup funding.",
      description: "The Women Economic Empowerment program started in 2016.",
      body: "The Women Economic Empowerment program started in 2016. Disadvantaged women are selected and receive basic business skills to help them engage in income-generating businesses.\n\nBesides training on business skills, women are given matching funds to launch start-ups.",
      services: [{ title: "Business Skills Training", description: "Comprehensive entrepreneurial training." }, { title: "Start-up Funding", description: "Matching funds to launch small businesses." }],
      coverImage: "/images/projects/women-empowerment.jpg", sdgs: [1, 5, 8, 10], order: 8,
      kpis: [{ label: "Women Supported", value: 30, order: 0 }],
    },
  ];

  // Major projects
  const majorProjects = [
    {
      slug: "li-way-project", title: "Li-Way Project", category: "PROJECT" as const,
      excerpt: "Livelihoods for Women and Youth — economic empowerment at scale.",
      description: "Selam Children's Village has implemented a pilot project entitled Livelihood Improvement for Women and Youth /LI-WAY/ Project.",
      body: "Selam Children's Village has implemented a pilot project entitled Livelihood Improvement for Women and Youth /LI-WAY/ Project in partnership with Save the Children Ethiopia with financial support from SIDA.\n\nThe project provided short-term vocational skill training and facilitated employment for 89 youths.\n\nThrough the LI-WAY Project, SCV facilitated the establishment of a legal savings and credit association with 188 members.",
      coverImage: "/images/projects/li-way.jpg", sdgs: [1, 5, 8], order: 9,
      kpis: [{ label: "Beneficiaries", value: 1500, order: 0 }, { label: "Jobs Created", value: 320, order: 1 }],
    },
    {
      slug: "bina-project", title: "BINA Project", category: "PROJECT" as const,
      excerpt: "Building Inclusive and Nurturing Alternatives for vulnerable youth.",
      description: "BINA is an Arabic word meaning 'reconstruction'.",
      body: "BINA is an Arabic word meaning 'reconstruction'. Financier of the project is German Cooperation through bfz.\n\nThe aim is to allow deprived youth to discover their talents and gain first experiences in vocational training.\n\nThe goal is to stabilize the economic situation by reducing youth unemployment.",
      services: [{ title: "Instructor Training", description: "Technical instructors trained in selected occupations." }, { title: "Youth Training", description: "250 adolescents trained in five vocational areas." }, { title: "Job Placement", description: "Job placement service for graduates." }],
      coverImage: "/images/projects/bina.jpg", sdgs: [1, 4, 8, 10], order: 10,
      kpis: [{ label: "Youth Served", value: 450, order: 0 }, { label: "Graduated", value: 280, order: 1 }],
    },
    {
      slug: "bridge-project", title: "Bridge Project", category: "PROJECT" as const,
      excerpt: "Bridging the gap for street-connected children and youth.",
      description: "Selam TVET College has signed a Partnership Agreement with First consult for Bridge Project implementation.",
      body: "Selam TVET College has signed a Partnership Agreement with First consult for Bridge Project implementation to provide capacity building training.\n\nThe agreement has signed to provide training to 1,000 operators of 50 manufacturing companies worth 5.9 million ETB.\n\nCurrently, 105 (91 Male, 14 Female) individuals are attending capacity building training.",
      coverImage: "/images/projects/bridge.jpg", sdgs: [1, 3, 4, 10, 16], order: 11,
      kpis: [{ label: "Children Reached", value: 300, order: 0 }, { label: "Families Reunited", value: 120, order: 1 }],
    },
    {
      slug: "paseway-project", title: "PaSeway Project", category: "PROJECT" as const,
      excerpt: "Pathway to Self-Employment for Women and Youth.",
      description: "Selam Children's Village has been implementing PASEWAY in partnership with Plan International Ethiopia.",
      body: "Selam Children's Village has been implementing a project called 'Pathways for Sustainable Employment for Women and Youth in Ethiopia' (PASEWAY) in partnership with Plan International Ethiopia.\n\nThe project is aimed at both young women and young men (60/40) between the ages of 15 and 29 years with a total of 1,050 young people to be reached.\n\nWe are addressing the unemployed through our TVET College by delivering quality short-term and level II training in five selected sectors.",
      coverImage: "/images/projects/paseway.jpg", sdgs: [1, 5, 8], order: 12,
      kpis: [{ label: "Participants", value: 800, order: 0 }, { label: "Businesses Launched", value: 200, order: 1 }],
    },
    {
      slug: "eye-project", title: "EYE Project", category: "PROJECT" as const,
      excerpt: "Empowering Youth in Ethiopia through quality education and training.",
      description: "Selam Children's Village in partnership with Woord en Daad has been implementing EYE Program since 2017.",
      body: "Selam Children's Village in partnership with Woord en Daad, a Netherland based International Organization, has been implementing Employable Youth in Ethiopia (EYE) Program as of 2017.\n\nThe approach used is the Job and Business Service (JBS) model, which actively links the main actors of youth training and employment.\n\nEYE provided hard and soft skills training to 3358 youths. Out of this, 2664 have graduated and 2596 have been linked with employment opportunities.",
      coverImage: "/images/projects/eye.jpg", sdgs: [4, 8], order: 13,
      kpis: [{ label: "Students Trained", value: 650, order: 0 }, { label: "Employment Rate", value: 78, suffix: "%", order: 1 }],
    },
    {
      slug: "public-private-partnership", title: "Public-Private Partnership", category: "PROJECT" as const,
      excerpt: "Collaborating with government and industry for sustainable impact.",
      description: "Our PPP initiatives bring together government agencies, private enterprises, and development partners.",
      body: "Our PPP initiatives bring together government agencies, private enterprises, and development partners to create scalable models for youth employment and social enterprise.",
      coverImage: "/images/projects/ppp.jpg", sdgs: [8, 17], order: 14,
      kpis: [{ label: "Partner Organizations", value: 25, order: 0 }, { label: "Programs Running", value: 8, order: 1 }],
    },
  ];

  const allProjects = [...projects, ...majorProjects];
  for (const p of allProjects) {
    const { kpis, ...projectData } = p;
    const created = await prisma.project.create({
      data: { ...projectData, services: p.services ?? undefined, status: "PUBLISHED" },
    });
    for (const kpi of kpis) {
      await prisma.projectKpi.create({ data: { ...kpi, projectId: created.id } });
    }
  }
  console.log("✅ Projects (" + allProjects.length + ") with KPIs");

  // ─── News ──────────────────────────────────────────────────────────────
  const newsCount = await prisma.news.count();
  if (newsCount === 0) {
    const news = [
      { title: "182 Youth Graduate from BEYEPP", slug: "182-youth-graduate-from-beyepp", excerpt: "A momentous occasion as 182 young men and women graduate from the Building Ethiopian Youth Employment and Productivity Program.", body: "182 young men and women graduate from the Building Ethiopian Youth Employment and Productivity Program, marking another milestone in our commitment to youth empowerment.", publishDate: new Date("2025-03-15"), category: "News", featured: true },
      { title: "Fundraising for Water Well Drilling", slug: "fundraising-for-water-well-drilling", excerpt: "Join our campaign to bring clean water to the community.", body: "Join our campaign to bring clean water to the community. Clean water access will improve health outcomes and quality of life for hundreds of families.", publishDate: new Date("2025-02-20"), category: "Campaign", featured: false },
      { title: "Girls Be Ambitious Project Graduation Ceremony", slug: "girls-be-ambitious-project-graduation", excerpt: "Celebrating the achievements of young women who have completed our Girls Be Ambitious skills training program.", body: "Celebrating the achievements of young women who have completed our Girls Be Ambitious skills training program, ready to enter the workforce with confidence.", publishDate: new Date("2025-01-10"), category: "Events", featured: false },
    ];
    for (const n of news) {
      await prisma.news.create({ data: { ...n, status: "PUBLISHED" } });
    }
    console.log("✅ News (3)");
  }

  // ─── Events ────────────────────────────────────────────────────────────
  const eventCount = await prisma.event.count();
  if (eventCount === 0) {
    const events = [
      { title: "Annual TVET Graduation Ceremony", slug: "tvet-graduation-2025", startsAt: new Date("2025-07-15T09:00:00"), endsAt: new Date("2025-07-15T12:30:00"), location: "Selam Main Campus, Addis Ababa", body: "Join us in celebrating the hard work and achievements of our TVET graduates." },
      { title: "Harvest in Generation Fundraising Gala", slug: "fundraising-gala", startsAt: new Date("2025-08-20T18:00:00"), endsAt: new Date("2025-08-20T22:00:00"), location: "Skylight Hotel, Addis Ababa", body: "An elegant evening dedicated to raising funds for our new School Feeding program expansion." },
      { title: "SCV Alumni Network Gathering", slug: "alumni-meetup", startsAt: new Date("2025-09-05T14:00:00"), endsAt: new Date("2025-09-05T17:00:00"), location: "Kotebe Campus", body: "Calling all former Selam children and graduates! Come reconnect and mentor the next generation." },
    ];
    for (const e of events) {
      await prisma.event.create({ data: { ...e, status: "PUBLISHED" } });
    }
    console.log("✅ Events (3)");
  }

  console.log("🎉 Projects & departments seeding complete!");
}

main()
  .catch((e) => { console.error("❌ Seed error:", e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
