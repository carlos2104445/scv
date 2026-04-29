export interface Person {
  name: string;
  role: string;
  category: "board" | "senior" | "extended" | "switzerland";
  bio?: string;
  order: number;
}

export const people: Person[] = [
  // Board Members
  { name: "Mr. Olani Gizaw", role: "Chairperson", category: "board", bio: "Leading the executive board with decades of experience in organizational governance and social welfare.", order: 1 },
  { name: "Prof. Wondwosen Tesfaye", role: "Deputy Chairman", category: "board", bio: "Academic leader bringing research-driven insights to the organization's strategic direction.", order: 2 },
  { name: "Dr. Teshome Lemma", role: "Board Member", category: "board", bio: "Contributing medical expertise and community health perspectives to organizational decisions.", order: 3 },
  { name: "Mr. Fasil Sisay", role: "Board Member", category: "board", bio: "Providing strategic guidance on financial sustainability and organizational growth.", order: 4 },
  { name: "Eng. Kassa Hailegiorgis", role: "Board Member", category: "board", bio: "Engineering professional offering technical insights for infrastructure development.", order: 5 },
  { name: "Mr. Taye Nigatu", role: "Board Member", category: "board", bio: "Experienced professional supporting governance and community outreach initiatives.", order: 6 },
  { name: "Mr. Tesfaye Adege", role: "Board Member", category: "board", bio: "Dedicated board member with a focus on child welfare and educational excellence.", order: 7 },

  // Senior Management
  { name: "Mr. Solomon Chali", role: "Executive Director", category: "senior", bio: "Leading the day-to-day operations of Selam Children's Village with a passion for child welfare and organizational excellence.", order: 1 },
  { name: "Mr. Nigussie Eshetie", role: "CYC Director", category: "senior", bio: "Overseeing the Children, Youth, and Community Support programs ensuring quality care and development.", order: 2 },
  { name: "Mr. Tibebu Leta", role: "Dean, TVET College", category: "senior", bio: "Managing the Technical and Vocational Education Training College, fostering skills development for youth.", order: 3 },

  // Extended Management
  { name: "Mr. Assefa G/medhin", role: "Manager", category: "extended", bio: "Contributing to the operational management and program implementation across the organization.", order: 1 },
  { name: "Mr. Assefa Misganaw", role: "Manager", category: "extended", bio: "Supporting organizational management with expertise in program coordination.", order: 2 },
  { name: "Cmdr. Teshome Fekade", role: "Manager", category: "extended", bio: "Bringing disciplined leadership and administrative skills to organizational management.", order: 3 },
  { name: "Mr. Getachew Alito", role: "Manager", category: "extended", bio: "Managing key operational areas with dedication to organizational goals.", order: 4 },
  { name: "Mr. Girmay Moges", role: "Manager", category: "extended", bio: "Contributing to strategic planning and program execution.", order: 5 },
  { name: "Mr. Leoulseged Kassahun", role: "Manager", category: "extended", bio: "Supporting organizational development and community engagement.", order: 6 },
  { name: "Mrs. Zufan G/egziabher", role: "Manager", category: "extended", bio: "Providing leadership in program management and stakeholder coordination.", order: 7 },
];

export function getPeopleByCategory(category: Person["category"]) {
  return people.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}
