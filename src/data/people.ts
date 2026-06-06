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
    name: "Olani Gizaw",
    role: "Chairperson",
    category: "BOARD",
    photo: "/images/people/Olani-1.jpg",
    bio: "Provides strategic leadership and governance oversight as Chairperson of Selam Children's Village Executive Board.",
    order: 1,
  },
  {
    id: "board-2",
    name: "Prof. Wondwosen Tesfaye",
    role: "Deputy Chairman",
    category: "BOARD",
    photo: null,
    bio: "Serves as Deputy Chairman providing strategic guidance and oversight for the organization's programs and operations.",
    order: 2,
  },
  {
    id: "board-3",
    name: "Dr. Teshome Lemma",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Dr.-Teshome-Lema.jpg",
    bio: "Accomplished academic and researcher contributing expertise in organizational development and governance.",
    order: 3,
  },
  {
    id: "board-4",
    name: "Fasil Sisay",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Fasil.jpg",
    bio: "Brings professional expertise and dedication to the board, contributing to strategic planning and organizational growth.",
    order: 4,
  },
  {
    id: "board-5",
    name: "Eng. Kassa Hailegiorgis",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Eng.-Kassa.jpg",
    bio: "Experienced engineer bringing technical expertise and strategic insight to the organization's infrastructure and development initiatives.",
    order: 5,
  },
  {
    id: "board-6",
    name: "Taye Nigatu",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Taye-Nigatu.jpg",
    bio: "A dedicated professional contributing to the organization's mission through governance and oversight of programs and operations.",
    order: 6,
  },
  {
    id: "board-7",
    name: "Tesfaye Adege",
    role: "Board Member",
    category: "BOARD",
    photo: "/images/people/Tesfaye-Adege-400x400.jpg",
    bio: "Contributes organizational leadership and oversight to the board, supporting the mission and strategic direction.",
    order: 7,
  },

  // ── Senior Management Team ──────────────────────────────────────────
  {
    id: "senior-1",
    name: "Solomon Chali",
    role: "Executive Director",
    category: "SENIOR",
    photo: "/images/people/Solomon-Chali-400x400.jpg",
    bio: "Leading Selam Children's Village as Executive Director, overseeing all organizational operations, strategic planning, and stakeholder relations.",
    order: 1,
  },

  // ── Extended Management Team ────────────────────────────────────────
  {
    id: "ext-1",
    name: "Assefa Misganaw",
    role: "Family Model Village Childcare Manager, SCV-II",
    category: "EXTENDED",
    photo: "/images/people/Assefa-1.jpg",
    bio: "Manages the family model village childcare program at Selam Children's Village II, ensuring quality care and support for children.",
    order: 1,
  },
  {
    id: "ext-2",
    name: "Cmdr. Teshome Fekade",
    role: "Facility Manager",
    category: "EXTENDED",
    photo: "/images/people/Commander-Teshome-Fekade-400x400.jpg",
    bio: "Oversees facility operations, maintenance, and security across all Selam Children's Village centers.",
    order: 2,
  },
  {
    id: "ext-3",
    name: "Getachew Alito",
    role: "Family Model Village Childcare Manager, SCV-I",
    category: "EXTENDED",
    photo: "/images/people/Getachew-A.jpg",
    bio: "Manages the family model village childcare program at Selam Children's Village I, overseeing child welfare and development.",
    order: 3,
  },
  {
    id: "ext-4",
    name: "Girmay Moges",
    role: "Vice Dean",
    category: "EXTENDED",
    photo: "/images/people/Girmay.png",
    bio: "Serves as Vice Dean of Selam Technical and Vocational College, supporting academic programs and student development.",
    order: 4,
  },
  {
    id: "ext-5",
    name: "Leoulseged Kassahun",
    role: "Capacity Building, Resource Mobilization & Partnership Manager",
    category: "EXTENDED",
    photo: "/images/people/Leoulseged-1.jpg",
    bio: "Leads capacity building initiatives, resource mobilization efforts, and partnership development for the organization.",
    order: 5,
  },
  {
    id: "ext-6",
    name: "Zufan G/egziabher",
    role: "Community Support Manager",
    category: "EXTENDED",
    photo: "/images/people/Zufan-1.jpg",
    bio: "Directs community support programs including women's empowerment, elderly support, and community health initiatives.",
    order: 6,
  },
];

export function getPeopleByCategory(category: Person["category"]): Person[] {
  return people.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}
