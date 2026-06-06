export interface Project {
  slug: string;
  title: string;
  category: "cyc" | "community" | "tvet" | "project";
  excerpt: string;
  description: string;
  additionalParagraphs?: string[];
  services?: { title: string; description: string }[];
  image: string;
  kpis: { label: string; value: number; suffix?: string }[];
  sdgs: number[];
}

export const projects: Project[] = [
  {
    slug: "family-model-village-child-care",
    title: "Family Model Village",
    category: "cyc",
    excerpt:
      "Providing a nurturing family environment for orphaned and vulnerable children through our model village approach.",
    description:
      "For four decades, Selam Children's Village (SCV) has been a sanctuary for orphaned and vulnerable children. While we successfully began with traditional institutional care in 1986, our commitment to the highest global standards of child psychology led to a major transformation in 2011.",
    additionalParagraphs: [
      "We proudly transitioned to the Family Model Village Child Care program because we believe every child deserves more than just a facility—they deserve a family.",
      "Today, our children do not live in dormitories; they live in their own homes. Each house provides a warm, family-like environment led by a dedicated foster mother, a foster aunt, and a father figure.",
      "Beyond daily meals and a safe environment, we ensure every child receives:"
    ],
    services: [
      { title: "A Loving Family", description: "Individualized attention and deep psychosocial support to heal from past trauma." },
      { title: "Holistic Health", description: "Comprehensive medical care at the Selam Clinic." },
      { title: "Empowerment", description: "Life-skills training and education to build confident, independent futures." }
    ],
    image: "/images/projects/family-village.jpg",
    kpis: [
      { label: "Children in Care", value: 255 },
      { label: "Male", value: 157 },
      { label: "Female", value: 98 },
      { label: "House Mothers", value: 12 },
    ],
    sdgs: [1, 2, 3, 4, 10],
  },
  {
    slug: "day-care",
    title: "Day Care Center",
    category: "cyc",
    excerpt:
      "Quality early childhood development and day care services for children of economically vulnerable working mothers.",
    description:
      "SCV has established a day care center with the aim of providing service for children (aged 2-4 years old) coming from economically poor women-headed families. The mothers of these children are very poor women who are fully engaged in the informal economy including petty trade, daily labor, and house maid etc to get income and run their daily livelihoods.",
    additionalParagraphs: [
      "The day care center helps mothers by keeping their kids the whole day (from 8:00 am-5:00pm) giving proper care within Selam Day Care facilities, so that the women could freely engage in their daily laborious jobs. Children at the day care get proper care while their parents are away to generate income. The center provides three meals per day (from Monday to Saturday) and the necessary care to the children until parents return from their daily work and take them back home."
    ],
    services: [
      { title: "Full-Day Supervision", description: "Safe and proper care from 8:00 AM to 5:00 PM, allowing mothers to work freely." },
      { title: "Nutritional Support", description: "Three nutritious meals provided per day from Monday to Saturday." },
      { title: "Early Childhood Care", description: "Dedicated support for children aged 2-4 from economically vulnerable families." }
    ],
    image: "/images/projects/daycare.jpg",
    kpis: [
      { label: "Children Enrolled", value: 242 },
      { label: "Male", value: 149 },
      { label: "Female", value: 93 },
    ],
    sdgs: [1, 4, 5, 10],
  },
  {
    slug: "youth-support-program",
    title: "Youth Support Program",
    category: "cyc",
    excerpt:
      "Empowering youth through skills training, mentorship, and support to become self-reliant members of society.",
    description:
      "The Youth Support Department is a cornerstone of the Children, Youth & Community Support Project. Our mission is to bridge the gap between childhood and adulthood, equipping young people with the skills, confidence, and resources they need to live independently and thrive within their communities.",
    additionalParagraphs: [
      "Transitioning to independence is a gradual process. Once children reach the age of 18 and demonstrate the necessary maturity and readiness they transition into our Semi-Independent Living (SIL) program. This phase functions as a 'living laboratory' where youth reside within the community while receiving a structured safety net.",
      "Achieving Full Integration: The final milestone of our program is professional self-sufficiency. Following graduation, we provide a six-month job search window with intensive guidance. Full integration is achieved once a young person secures a stable job, becomes financially self-reliant, and successfully manages their own life endeavors."
    ],
    services: [
      { title: "Financial Assistance", description: "Monthly allowances to manage housing, food, and daily essentials." },
      { title: "Social Work Support", description: "Regular follow-ups, orientation, and mentorship from dedicated social workers." },
      { title: "Holistic Care", description: "Continued psychosocial and educational support to navigate the complexities of adult life." },
      { title: "Technical Skill Training", description: "Hands-on vocational paths for immediate career entry." },
      { title: "Higher Education", description: "Support for university studies based on academic merit and personal interest." }
    ],
    image: "/images/projects/youth-support.jpg",
    kpis: [
      { label: "Number of Youth", value: 93 },
      { label: "Male", value: 59 },
      { label: "Female", value: 34 },
    ],
    sdgs: [1, 4, 8, 10],
  },
  {
    slug: "school-feeding",
    title: "School Feeding Program",
    category: "community",
    excerpt:
      "Ensuring children receive nutritious meals to support their health and academic performance.",
    description:
      "There are more than 3000 students and trainees enrolled in Selam Educational institutions (KG to Technical and Vocational College). The lunch service is provided for students who cannot afford to have one meal per day due to the economic condition of their families.",
    additionalParagraphs: [
      "The aim of this support is to minimize irregular school attendance and malnutrition, which ultimately results in poor academic performance. The service is not only limited to Selam Schools and the TVET College but also extends to other nearby government-owned schools."
    ],
    services: [
      { title: "Daily Lunch Service", description: "Providing nutritious daily meals to students facing severe economic hardship." },
      { title: "Academic Performance Support", description: "Reducing malnutrition to improve school attendance and cognitive development." },
      { title: "Community Reach", description: "Extending feeding programs to surrounding government-owned schools." }
    ],
    image: "/images/projects/school-feeding.jpg",
    kpis: [
      { label: "Total Children", value: 526 },
      { label: "Male", value: 260 },
      { label: "Female", value: 266 },
    ],
    sdgs: [1, 2, 3, 4],
  },
  {
    slug: "educational-support",
    title: "Educational Support",
    category: "community",
    excerpt:
      "Providing scholarships, materials, and tutoring to protect children from dropping out of school.",
    description:
      "The Educational Support program is designed to protect children from dropping out of school. It helps minimize absenteeism and reduces the economic burden on disadvantaged families.",
    additionalParagraphs: [
      "This program contributes directly to the improvement of children's academic performance by addressing both their material and academic needs. By ensuring they have the right tools, we give every child a fair chance at a bright future."
    ],
    services: [
      { title: "Scholarships & Allowances", description: "Providing financial support and monthly allowances to cover basic educational needs." },
      { title: "School Materials", description: "Provision of essential stationery, backpacks, and required school uniforms." },
      { title: "Tutorial Support", description: "After-school tutoring and academic guidance to improve performance." }
    ],
    image: "/images/projects/education-real.jpg",
    kpis: [
      { label: "Students Supported", value: 202 },
      { label: "Male", value: 114 },
      { label: "Female", value: 88 },
    ],
    sdgs: [1, 4, 8, 10],
  },
  {
    slug: "destitute-elderly-women-support",
    title: "Elderly Women Support",
    category: "community",
    excerpt:
      "Providing care, monthly allowances, and work therapy for destitute elderly women.",
    description:
      "The Elderly Women Support program was designed in 2010 to provide vital services to elderly women who live as widows, are chronically ill, or are HIV positive.",
    additionalParagraphs: [
      "Since these vulnerable elderly women are unable to save earnings for themselves and often lack family support, they are provided with a monthly cash allowance to meet their basic needs.",
      "Additionally, handicraft materials are provided so they can engage in the production of handmade products, which serves as a valuable and engaging work therapy for them."
    ],
    services: [
      { title: "Monthly Allowance", description: "Providing direct cash assistance to help elderly women cover their daily living expenses." },
      { title: "Work Therapy", description: "Supplying handicraft materials to encourage therapeutic engagement and skill use." },
      { title: "Holistic Care", description: "Offering a supportive community network for widows and those living with chronic illnesses." }
    ],
    image: "/images/projects/elderly-support.jpg",
    kpis: [
      { label: "Total Women Supported", value: 10 },
    ],
    sdgs: [1, 2, 3, 5, 10],
  },
  {
    slug: "hygiene-kit-support-for-girls",
    title: "Hygiene Kit for Girls",
    category: "community",
    excerpt:
      "Supporting girls' education and dignity by providing essential hygiene kits.",
    description:
      "A hygiene kit (sanitary pads, soaps and hair pomade) scheme is organized to create a chance for destitute girls to attend classes with full concentration and gain self-confidence, relieving anxiety regarding basic necessities.",
    additionalParagraphs: [
      "This support has a huge impact in minimizing class absenteeism for girls during their menstruation period. The service is not limited only to Selam Schools and the TVET College, but also extends to other nearby government-owned schools."
    ],
    services: [
      { title: "Essential Hygiene Kits", description: "Providing sanitary pads, soaps, and hair pomade to destitute girls." },
      { title: "Reducing Absenteeism", description: "Ensuring girls do not miss school due to lack of basic menstrual hygiene products." },
      { title: "Community Outreach", description: "Extending the support beyond Selam to surrounding government schools." }
    ],
    image: "/images/projects/hygiene-kit.jpg",
    kpis: [
      { label: "Total Girls Supported", value: 300 },
    ],
    sdgs: [3, 4, 5, 6],
  },
  {
    slug: "women-economic-empowerment",
    title: "Women Economic Empowerment",
    category: "community",
    excerpt:
      "Empowering disadvantaged women through basic business skills and startup funding.",
    description:
      "The Women Economic Empowerment program started in 2016. Disadvantaged women are selected and receive basic business skills to help them engage in income-generating businesses and enable them to be self-supportive families.",
    additionalParagraphs: [
      "Besides training on business skills, women are given matching funds to launch start-ups and engage in small businesses, ensuring long-term financial independence and community growth."
    ],
    services: [
      { title: "Business Skills Training", description: "Comprehensive training to develop essential entrepreneurial and business management skills." },
      { title: "Start-up Funding", description: "Providing matching funds to help women successfully launch and sustain their small businesses." },
      { title: "Self-Reliance Support", description: "Empowering women to become financially independent and support their families." }
    ],
    image: "/images/projects/women-empowerment.jpg",
    kpis: [
      { label: "Women Supported", value: 30 },
    ],
    sdgs: [1, 5, 8, 10],
  },
  {
    slug: "selam-clinic",
    title: "Health & Clinic Service",
    category: "cyc",
    excerpt:
      "Providing essential healthcare services to children, staff, and community members.",
    description:
      "Established in 1988, Selam Clinic was founded with a vital mission: to provide high-quality healthcare to the children and youth of Selam Children's Village (SCV) and the surrounding community. For over three decades, we have remained committed to accessibility, offering services free of charge or through a minimal cost-sharing model to ensure that quality care is never out of reach.",
    additionalParagraphs: [
      "Our facility has evolved into a multi-disciplinary health hub, offering a wide range of essential services designed to meet the diverse needs of our patients.",
      "Quality and safety are the pillars of our operations. We are honored to have been awarded the Green Working License for 2015 E.C. This prestigious recognition was granted by the regulatory authorities in acknowledgment of Selam Clinic meeting and exceeding the standard regulatory procedures and healthcare benchmarks. This certification underscores our commitment to maintaining a safe, efficient, and professional medical environment for every patient we serve."
    ],
    services: [
      { title: "Preventative Care", description: "Focused health education and TB/HIV prevention and treatment programs." },
      { title: "Maternal Health", description: "Comprehensive Focused Antenatal Care (FANC) to support healthy pregnancies and deliveries." },
      { title: "Diagnostic Excellence", description: "Modern laboratory services, Digital X-ray, and Ultrasound examinations for accurate and timely diagnosis." },
      { title: "General Medicine", description: "A dedicated Outpatient Department (OPD) for daily health concerns." },
      { title: "Dental Care", description: "We are proud to announce that the clinic has recently been licensed to provide professional dental services to our children, youth, and community members." }
    ],
    image: "/images/projects/clinic.jpg",
    kpis: [
      { label: "Patients Reached", value: 16688 },
      { label: "Healthcare Workers", value: 8 },
    ],
    sdgs: [3, 10],
  },
];

export const majorProjects: Project[] = [
  {
    slug: "li-way-project",
    title: "Li-Way Project",
    category: "project",
    excerpt: "Livelihoods for Women and Youth — economic empowerment at scale.",
    description: "Selam Children’s Village has implemented a pilot project entitled Livelihood Improvement for Women and Youth /LI-WAY/ Project in partnership with Save the Children Ethiopia with financial support from the Swedish International Development Cooperation Agency (SIDA).",
    additionalParagraphs: [
      "The overall objective of the program was to contribute to sustainable poverty reduction, improved gender relations and social stability of women and youths in Addis Ababa by increasing their income and access to economic opportunities. The project provided short-term vocational skill training and facilitated employment for 89 youths.",
      "Through the LI-WAY Project, SCV has facilitated the establishment of a legal savings and credit association named “Selam LI-WAY-EYE Saving and Credit Association”. The association has 188 members and SCV has deposited a total amount of 1,800,000.00 ETB as an initial capital. Currently, the capital of the association has increased to 3,000,000.00 ETB. 73 members have accessed loan from the association and all of them successfully repaid."
    ],
    image: "/images/projects/li-way.jpg",
    kpis: [
      { label: "Beneficiaries", value: 1500 },
      { label: "Jobs Created", value: 320 },
    ],
    sdgs: [1, 5, 8],
  },
  {
    slug: "bina-project",
    title: "BINA Project",
    category: "project",
    excerpt: "Building Inclusive and Nurturing Alternatives for vulnerable youth.",
    description: "BINA is an Arabic word meaning “reconstruction”. Financier of the project is German Cooperation through bfz (Training and Development Centers of the Bavarian Employers’ Associations).",
    additionalParagraphs: [
      "The aim of the project is to allow deprived youth to discover their talents and gain first experiences in an area of vocational training. Afterwards, participants shall enroll in internships, longer vocational training or seek employment/self-employment.",
      "It’s a one year project with possibility of extension for another six years. The goal of this project is to stabilize the economic situation of a country by reducing youth unemployment; improving the situation of young people and their families through vocational training and job placement in work."
    ],
    services: [
      { title: "Instructor Training", description: "Technical instructors from the college are trained and upgraded in selected occupations." },
      { title: "Youth Training", description: "250 Adolescents and young adults are trained in five elected vocational areas." },
      { title: "Job Placement", description: "A job placement service for graduates is established at the local education provider." }
    ],
    image: "/images/projects/bina.jpg",
    kpis: [
      { label: "Youth Served", value: 450 },
      { label: "Graduated", value: 280 },
    ],
    sdgs: [1, 4, 8, 10],
  },
  {
    slug: "bridge-project",
    title: "Bridge Project",
    category: "project",
    excerpt: "Bridging the gap for street-connected children and youth.",
    description: "Selam TVET College has signed a Partnership Agreement with First consult for Bridge Project implementation to provide capacity building training to machine operators of manufacturing companies to enhance their productivity, quality and profitability.",
    additionalParagraphs: [
      "Additionally, this training will help the company’s (employees) operators to claim benefit and career.",
      "The agreement has signed to provide training to 1,000 operators of 50 manufacturing companies. The partnership agreement is worth of 5.9 million ETB.",
      "Currently, 105 (91 Male, 14 Female) individuals are attending capacity building training."
    ],
    image: "/images/projects/bridge.jpg",
    kpis: [
      { label: "Children Reached", value: 300 },
      { label: "Families Reunited", value: 120 },
    ],
    sdgs: [1, 3, 4, 10, 16],
  },
  {
    slug: "paseway-project",
    title: "PaSeway Project",
    category: "project",
    excerpt: "Pathway to Self-Employment for Women and Youth.",
    description: "Selam Children’s Village has been implementing a project called “Pathways for Sustainable Employment for Women and Youth in Ethiopia” (PASEWAY) in partnership with Plan International Ethiopia.",
    additionalParagraphs: [
      "The project is aimed at both young women and young men (60/40) between the ages of 15 and 29 years with a total of 1,050 young people to be reached. The number of indirect beneficiaries is estimated at around 300,000. With this project, we intend to focus, not just on unemployed young people, but also young people who are underemployed or who find themselves in precarious employment conditions.",
      "From SCV’s side, the project has concentrated on two districts of the city in particular: Woredas 3, 4, 6 and 7 of the Addis Ketema sub-city, and Woredas 9, 10, 11, 12 and 14 of Yeka sub-city.",
      "We are addressing the unemployed and under-employed young people through our TVET College by delivering quality short-term and level II training freely in five selected sectors such as Metal Works, Furniture Making, Hotel kitchen Operation, Catering Services and Garment."
    ],
    image: "/images/projects/paseway.jpg",
    kpis: [
      { label: "Participants", value: 800 },
      { label: "Businesses Launched", value: 200 },
    ],
    sdgs: [1, 5, 8],
  },
  {
    slug: "eye-project",
    title: "EYE Project",
    category: "project",
    excerpt: "Empowering Youth in Ethiopia through quality education and training.",
    description: "Selam Children’s Village /SCV/ in partnership with Woord en Daad, a Netherland based International Organization, has been implementing Employable Youth in Ethiopia (EYE) Program as of 2017.",
    additionalParagraphs: [
      "The EYE Project aims to contribute to increased employability of Male & Female Youths in Ethiopia for a better future and to contribute to improved capability of potential migrants to move self-sufficiency within the labor market to realize their full potential and improve their livelihoods.",
      "The approach used for the EYE Project is the Job and Business Service (JBS) model, which actively links the main actors of the youth training and employment. Through this approach, all the major actors: the youth, the training provider (Selam TVET College), employers, and other key stakeholders are connected to meet the project objective.",
      "EYE is a five years project that is being implemented in two Sub Cities of Addis Ababa, Yeka and Bole. The project is intended to create employment opportunities for 3000 youths by providing short-term TVET training in nine fields.",
      "As per the project agreement, EYE Project provided hard and soft skills training to 3358 youths. Out of this, 2664 youths have graduated and 2596 youths have been linked with wage and self-employment opportunities."
    ],
    image: "/images/projects/eye.jpg",
    kpis: [
      { label: "Students Trained", value: 650 },
      { label: "Employment Rate", value: 78, suffix: "%" },
    ],
    sdgs: [4, 8],
  },
  {
    slug: "public-private-partnership",
    title: "Public-Private Partnership",
    category: "project",
    excerpt: "Collaborating with government and industry for sustainable impact.",
    description: "Our PPP initiatives bring together government agencies, private enterprises, and development partners to create scalable models for youth employment and social enterprise.",
    image: "/images/projects/ppp.jpg",
    kpis: [
      { label: "Partner Organizations", value: 25 },
      { label: "Programs Running", value: 8 },
    ],
    sdgs: [8, 17],
  },
  {
    slug: "bbw-project",
    title: "BBW Project",
    category: "project",
    excerpt: "Building Bridges for Work — connecting youth to meaningful employment opportunities.",
    description: "The BBW (Building Bridges for Work) Project is a collaborative initiative aimed at bridging the gap between vocational training and the labor market. Working closely with industry partners and government stakeholders, the project focuses on creating sustainable pathways from education to employment for disadvantaged youth in urban areas.",
    additionalParagraphs: [
      "Through a combination of targeted skills training, workplace mentoring, and job matching services, the BBW Project has helped hundreds of young people secure stable employment. The project also works with employers to develop apprenticeship frameworks that benefit both businesses and trainees.",
      "The BBW Project operates in close coordination with Selam TVET College, leveraging its existing training infrastructure while introducing innovative pedagogical approaches aligned with current labor market demands."
    ],
    image: "/images/projects/bridge.jpg",
    kpis: [
      { label: "Youth Trained", value: 200 },
      { label: "Job Placements", value: 150 },
    ],
    sdgs: [4, 8, 10],
  },
  {
    slug: "qiyas-project",
    title: "Qiyas Project",
    category: "project",
    excerpt: "Quality Improvement for Youth and Adolescent Services — strengthening institutional capacity.",
    description: "The Qiyas Project focuses on quality improvement within youth development organizations, aiming to enhance the standards of care, education, and vocational training services provided to vulnerable youth and adolescents across Ethiopia.",
    additionalParagraphs: [
      "By introducing standardized assessment frameworks, monitoring tools, and continuous improvement methodologies, Qiyas helps organizations like Selam Children's Village measure and enhance the impact of their programs.",
      "The project emphasizes evidence-based practices, staff capacity building, and institutional strengthening to ensure that services for youth and adolescents meet the highest possible standards of quality and effectiveness."
    ],
    image: "/images/projects/eye.jpg",
    kpis: [
      { label: "Organizations Assessed", value: 15 },
      { label: "Staff Trained", value: 120 },
    ],
    sdgs: [4, 10, 16],
  },
];
