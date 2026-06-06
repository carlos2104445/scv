export interface Person {
  id: string;
  name: string;
  role: string;
  category: "BOARD" | "SENIOR" | "EXTENDED";
  photo: string | null;
  bio: string | null;
  order: number;
}

export const people: Person[] = [
  // ── Executive Board Members ─────────────────────────────────────────
  {
    id: "board-1",
    name: "Prof. Daniel Kitaw",
    role: "Board Chairperson",
    category: "BOARD",
    photo: "/images/people/Prof.-Daniel.jpg",
    bio: "Professor of Industrial Engineering at Addis Ababa University. Has served as chairperson of Selam Children's Village board for over a decade, providing strategic leadership and governance.",
    order: 1,
  },
  {
    id: "board-2",
    name: "Cmdr. Teshome Fekade",
    role: "Board Vice Chairperson",
    category: "BOARD",
    photo: "/images/people/Commander-Teshome-Fekade-400x400.jpg",
    bio: "A dedicated leader committed to the welfare of children and community development. Serves as Vice Chairperson providing oversight and strategic guidance.",
    order: 2,
  },
  {
    id: "board-3",
    name: "Dr. Teshome Lema",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Dr.-Teshome-Lema.jpg",
    bio: "Accomplished academic and researcher contributing expertise in organizational development and governance to Selam Children's Village.",
    order: 3,
  },
  {
    id: "board-4",
    name: "Eng. Kassa Ayalew",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Eng.-Kassa.jpg",
    bio: "Experienced engineer bringing technical expertise and strategic insight to the organization's infrastructure and development initiatives.",
    order: 4,
  },
  {
    id: "board-5",
    name: "Mr. Birhan Moges",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Birhan.jpg",
    bio: "A dedicated professional contributing to the organization's mission through governance and oversight of programs and operations.",
    order: 5,
  },

  // ── Senior Management Team ──────────────────────────────────────────
  {
    id: "senior-1",
    name: "Mr. Solomon Chali",
    role: "Executive Director",
    category: "SENIOR",
    photo: "/images/people/Solomon-Chali-400x400.jpg",
    bio: "Leading Selam Children's Village as Executive Director, Mr. Solomon Chali oversees all organizational operations, strategic planning, and stakeholder relations. Under his leadership, the organization has expanded its programs and reached more beneficiaries.",
    order: 1,
  },
  {
    id: "senior-2",
    name: "Mr. Tesfaye Adege",
    role: "Deputy Executive Director",
    category: "SENIOR",
    photo: "/images/people/Tesfaye-Adege-400x400.jpg",
    bio: "As Deputy Executive Director, Mr. Tesfaye Adege supports the executive leadership in managing day-to-day operations, program implementation, and organizational development across all Selam centers.",
    order: 2,
  },

  // ── Extended Management Team ────────────────────────────────────────
  {
    id: "ext-1",
    name: "Ato Dereje Bekele",
    role: "Finance & Administration Director",
    category: "EXTENDED",
    photo: null,
    bio: "Oversees all financial operations, budgeting, and administrative functions of the organization.",
    order: 1,
  },
  {
    id: "ext-2",
    name: "W/ro Almaz Tadesse",
    role: "Child & Youth Care Program Director",
    category: "EXTENDED",
    photo: null,
    bio: "Leads the child and youth care programs including family-based care, education support, and psychosocial services.",
    order: 2,
  },
  {
    id: "ext-3",
    name: "Ato Fekadu Mekonnen",
    role: "TVET College Dean",
    category: "EXTENDED",
    photo: null,
    bio: "Manages the Technical and Vocational Education Training College, overseeing 11 departments and hundreds of students.",
    order: 3,
  },
  {
    id: "ext-4",
    name: "Ato Habtamu Girma",
    role: "Community Development Director",
    category: "EXTENDED",
    photo: null,
    bio: "Directs community outreach programs including women's empowerment, elderly support, and community health initiatives.",
    order: 4,
  },
  {
    id: "ext-5",
    name: "W/ro Tigist Assefa",
    role: "Human Resources Manager",
    category: "EXTENDED",
    photo: null,
    bio: "Manages human resources functions including recruitment, training, and staff development across all centers.",
    order: 5,
  },
  {
    id: "ext-6",
    name: "Ato Yohannes Tesfaye",
    role: "Monitoring & Evaluation Manager",
    category: "EXTENDED",
    photo: null,
    bio: "Leads monitoring and evaluation of all programs, ensuring impact measurement and continuous improvement.",
    order: 6,
  },
];

export function getPeopleByCategory(category: Person["category"]): Person[] {
  return people.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}
