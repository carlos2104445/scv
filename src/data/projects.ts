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
      "Quality early childhood development and day care services for children of working families in the community.",
    description:
      "Our Day Care Center provides quality early childhood education and care for children aged 3-6, supporting working parents while ensuring children receive proper nutrition, education, and socialization.",
    image: "/images/projects/daycare.jpg",
    kpis: [
      { label: "Children Enrolled", value: 120 },
      { label: "Qualified Staff", value: 15 },
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
      "Our Youth Support Program helps young adults who have grown up in our care transition into independent, self-sufficient members of society through vocational training, mentorship, and startup support.",
    image: "/images/projects/youth-support.jpg",
    kpis: [
      { label: "Youth Supported", value: 180 },
      { label: "Successfully Employed", value: 142 },
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
      "The School Feeding Program provides nutritious daily meals to children within our village and surrounding community schools, addressing hunger and improving educational outcomes.",
    image: "/images/projects/school-feeding.jpg",
    kpis: [
      { label: "Meals Served Daily", value: 450 },
      { label: "Children Fed", value: 320 },
    ],
    sdgs: [1, 2, 3, 4],
  },
  {
    slug: "educational-support",
    title: "Educational Support",
    category: "community",
    excerpt:
      "Providing scholarships, tutoring, and educational materials to help children succeed academically.",
    description:
      "Our Educational Support program provides comprehensive academic assistance including school supplies, tutoring, library access, and scholarships to ensure every child in our care achieves their full academic potential.",
    image: "/images/projects/education.jpg",
    kpis: [
      { label: "Students Supported", value: 380 },
      { label: "Scholarships Awarded", value: 45 },
    ],
    sdgs: [4, 5, 10],
  },
  {
    slug: "destitute-elderly-women-support",
    title: "Elderly Women Support",
    category: "community",
    excerpt:
      "Caring for destitute elderly women by providing shelter, food, and healthcare services.",
    description:
      "This program extends our mission of care to destitute elderly women in the community, providing them with shelter, regular meals, healthcare, and a supportive community environment.",
    image: "/images/projects/elderly-support.jpg",
    kpis: [
      { label: "Women Supported", value: 60 },
      { label: "Years Running", value: 15 },
    ],
    sdgs: [1, 2, 3, 5, 10],
  },
  {
    slug: "hygiene-kit-support-for-girls",
    title: "Hygiene Kit for Girls",
    category: "community",
    excerpt:
      "Supporting girls' education and dignity by providing essential hygiene kits and health education.",
    description:
      "Our Hygiene Kit program addresses a critical barrier to girls' education by providing sanitary supplies and health education, ensuring girls can attend school regularly with dignity.",
    image: "/images/projects/hygiene-kit.jpg",
    kpis: [
      { label: "Girls Reached", value: 500 },
      { label: "Kits Distributed", value: 2400 },
    ],
    sdgs: [3, 4, 5, 6],
  },
  {
    slug: "women-economic-empowerment",
    title: "Women Economic Empowerment",
    category: "community",
    excerpt:
      "Empowering women through skills training, microfinance, and entrepreneurship support.",
    description:
      "This program empowers women in the surrounding community through vocational skills training, access to microfinance, business mentorship, and cooperative formation to achieve financial independence.",
    image: "/images/projects/women-empowerment.jpg",
    kpis: [
      { label: "Women Trained", value: 200 },
      { label: "Businesses Started", value: 85 },
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
    description: "The Li-Way Project focuses on creating sustainable livelihoods for women and youth through market-driven skills training, apprenticeships, and enterprise development in partnership with international development organizations.",
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
    description: "The BINA Project provides alternative care and transition services for vulnerable youth, helping them build independent lives through education, training, and social support systems.",
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
    description: "The Bridge Project works with street-connected children and youth, providing outreach, rehabilitation, family reintegration, and alternative care services to help them transition off the streets.",
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
    description: "PaSeway enables women and youth to achieve economic independence through technical and vocational education, business development services, and access to financial services.",
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
    description: "The EYE Project focuses on improving the quality and relevance of technical and vocational education and training to better prepare Ethiopian youth for the labor market.",
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
];
