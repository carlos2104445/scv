export interface Department {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  highlights: string[];
}

export const departments: Department[] = [
  {
    slug: "electrical-and-electronics-technology-department",
    title: "Electrical & Electronics Technology Department",
    shortTitle: "Electrical & Electronics",
    description: "Training skilled technicians in electrical installation, maintenance, and electronics repair. Graduates are prepared for careers in industrial electrical work, building wiring, and electronic device servicing.",
    highlights: ["Industrial electrical installation", "Electronic device repair", "Building wiring systems", "PLC programming basics"],
  },
  {
    slug: "construction-technology-department",
    title: "Construction Technology Department",
    shortTitle: "Construction Technology",
    description: "Providing comprehensive training in modern construction techniques, materials science, and project management. Students learn both theoretical foundations and hands-on building skills.",
    highlights: ["Modern building techniques", "Construction materials", "Blueprint reading", "Site management"],
  },
  {
    slug: "department-of-metal-manufacturing",
    title: "Department of Metal Manufacturing",
    shortTitle: "Metal Manufacturing",
    description: "Equipping students with skills in metalworking, welding, fabrication, and manufacturing processes. The department prepares graduates for careers in industrial metalwork and fabrication shops.",
    highlights: ["Welding & fabrication", "Sheet metal work", "Machine operation", "Quality control"],
  },
  {
    slug: "heavy-duty-vehicles-and-earth-moving-machinery-maintenance-department",
    title: "Heavy Duty Vehicles & Earth Moving Machinery Maintenance",
    shortTitle: "Heavy Machinery",
    description: "Specialized training in the maintenance and repair of heavy-duty vehicles, earth-moving equipment, and construction machinery used across Ethiopia's growing infrastructure sector.",
    highlights: ["Engine diagnostics", "Hydraulic systems", "Preventive maintenance", "Heavy equipment operation"],
  },
  {
    slug: "department-of-hotel-and-hospitality",
    title: "Department of Hotel & Hospitality",
    shortTitle: "Hotel & Hospitality",
    description: "Preparing students for careers in Ethiopia's growing hospitality industry with training in hotel management, food service, customer relations, and tourism services.",
    highlights: ["Hotel management", "Food & beverage service", "Customer relations", "Tourism services"],
  },
  {
    slug: "garment-production-department",
    title: "Garment Production Department",
    shortTitle: "Garment Production",
    description: "Training in textile and garment manufacturing, from pattern making and cutting to sewing and quality control. Graduates are prepared for the growing Ethiopian textile industry.",
    highlights: ["Pattern making", "Industrial sewing", "Quality control", "Fashion design basics"],
  },
  {
    slug: "secretarial-and-office-administration-department",
    title: "Secretarial & Office Administration Department",
    shortTitle: "Office Administration",
    description: "Developing professional office management skills including document management, communication, computer applications, and organizational administration.",
    highlights: ["Office management", "Computer applications", "Business communication", "Document management"],
  },
  {
    slug: "information-technology-department",
    title: "Information Technology Department",
    shortTitle: "Information Technology",
    description: "Comprehensive IT training covering computer hardware, software development, networking, and digital literacy. Preparing students for Ethiopia's growing tech sector.",
    highlights: ["Computer hardware", "Software basics", "Networking", "Digital literacy"],
  },
  {
    slug: "woodwork-technology-department",
    title: "Woodwork Technology Department",
    shortTitle: "Woodwork Technology",
    description: "Training in woodworking skills from furniture design and construction to wood finishing. Students learn both traditional craftsmanship and modern woodworking techniques.",
    highlights: ["Furniture design", "Wood joinery", "Machine woodworking", "Finishing techniques"],
  },
  {
    slug: "urban-agriculture-department",
    title: "Urban Agriculture Department",
    shortTitle: "Urban Agriculture",
    description: "Teaching sustainable urban farming techniques including greenhouse management, hydroponics, small animal husbandry, and organic farming practices.",
    highlights: ["Greenhouse management", "Urban farming", "Organic practices", "Small animal husbandry"],
  },
  {
    slug: "misale-drivers-training-academy",
    title: "Misale Drivers Training Academy",
    shortTitle: "Drivers Training",
    description: "Professional driving instruction for various vehicle classes, including defensive driving, traffic regulations, and vehicle maintenance basics.",
    highlights: ["Professional driving", "Traffic regulations", "Vehicle maintenance", "Defensive driving"],
  },
];
