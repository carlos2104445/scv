export interface Department {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  additionalParagraphs?: string[];
  services?: { title: string; description: string }[];
  highlights: string[];
  image?: string;
}

export const departments: Department[] = [
  {
    slug: "electrical-and-electronics-technology-department",
    title: "Electrical & Electronics Technology Department",
    shortTitle: "Electrical & Electronics",
    description: "Providing excellent vocational training in Electrical & Electronics.",
    highlights: [
      "industrial electrical installation",
      "Electronic device repair",
      "Building wiring systems",
      "PLC programming basics",
    ],
    image: "/images/tvet/electrical-and-electronics.jpg",
  },
  {
    slug: "construction-technology-department",
    title: "Construction Technology Department",
    shortTitle: "Construction Technology",
    description: "Providing excellent vocational training in Construction Technology.",
    highlights: [
      "Modern building techniques",
      "Construction materials",
      "Blueprint reading",
      "Site management",
    ],
    image: "/images/tvet/construction-technology.jpg",
  },
  {
    slug: "department-of-metal-manufacturing",
    title: "Department of Metal Manufacturing",
    shortTitle: "Metal Manufacturing",
    description: "Providing excellent vocational training in Metal Manufacturing.",
    highlights: [
      "Welding & fabrication",
      "Sheet metal work",
      "Machine operation",
      "Quality control",
    ],
    image: "/images/tvet/metal-manufacturing.jpg",
  },
  {
    slug: "heavy-duty-vehicles-and-earth-moving-machinery-maintenance-department",
    title: "Heavy Duty Vehicles & Earth Moving Machinery Maintenance",
    shortTitle: "Heavy Machinery",
    description: "Providing excellent vocational training in Heavy Machinery.",
    highlights: [
      "Engine diagnostics",
      "Hydraulic systems",
      "Preventive maintenance",
      "Heavy equipment operation",
    ],
    image: "/images/tvet/heavy-machinery.jpg",
  },
  {
    slug: "department-of-hotel-and-hospitality",
    title: "Department of Hotel & Hospitality",
    shortTitle: "Hotel & Hospitality",
    description: "Providing excellent vocational training in Hotel & Hospitality.",
    highlights: [
      "Hotel management",
      "Food & beverage service",
      "Customer relations",
      "Tourism services",
    ],
    image: "/images/tvet/hotel-and-hospitality.jpg",
  },
  {
    slug: "garment-production-department",
    title: "Garment Production Department",
    shortTitle: "Garment Production",
    description: "Providing excellent vocational training in Garment Production.",
    highlights: [
      "Pattern making",
      "Industrial sewing",
      "Quality control",
      "Fashion design basics",
    ],
    image: "/images/tvet/garment-production.jpg",
  },
  {
    slug: "secretarial-and-office-administration-department",
    title: "Secretarial & Office Administration Department",
    shortTitle: "Office Administration",
    description: "Providing excellent vocational training in Office Administration.",
    highlights: [
      "Office management",
      "Computer applications",
      "Business communication",
      "Document management",
    ],
    image: "/images/tvet/office-administration.jpg",
  },
  {
    slug: "information-technology-department",
    title: "Information Technology Department",
    shortTitle: "Information Technology",
    description: "Providing excellent vocational training in Information Technology.",
    highlights: [
      "Computer hardware",
      "Software basics",
      "Networking",
      "Digital literacy",
    ],
    image: "/images/tvet/information-technology.jpg",
  },
  {
    slug: "woodwork-technology-department",
    title: "Woodwork Technology Department",
    shortTitle: "Woodwork Technology",
    description: "Providing excellent vocational training in Woodwork Technology.",
    highlights: [
      "Furniture design",
      "Wood joinery",
      "Machine woodworking",
      "Finishing techniques",
    ],
    image: "/images/tvet/woodwork-technology.jpg",
  },
  {
    slug: "urban-agriculture-department",
    title: "Urban Agriculture Department",
    shortTitle: "Urban Agriculture",
    description: "Providing excellent vocational training in Urban Agriculture.",
    highlights: [
      "Greenhouse management",
      "Urban farming",
      "Organic practices",
      "Small animal husbandry",
    ],
    image: "/images/tvet/urban-agriculture.jpg",
  },
  {
    slug: "misale-drivers-training-academy",
    title: "Misale Drivers Training Academy",
    shortTitle: "Drivers Training",
    description: "Providing excellent vocational training in Drivers Training.",
    highlights: [
      "Professional driving",
      "Traffic regulations",
      "Vehicle maintenance",
      "Defensive driving",
    ],
    image: "/images/tvet/drivers-training.jpg",
  },
];
