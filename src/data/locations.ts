export interface Location {
  slug: string;
  name: string;
  region: string;
  description: string;
  highlights: string[];
  programs: string[];
  established: string;
  image: string;
  coordinates: { lat: number; lng: number };
}

export const locations: Location[] = [
  {
    slug: "addis-ababa",
    name: "Addis Ababa",
    region: "Addis Ababa City Administration",
    description:
      "Our main headquarters and the birthplace of Selam Children's Village. Located in the Kotebe neighborhood near Hana Mariam Church, the Addis Ababa campus houses our primary children's village, the Selam Technical and Vocational College, Selam Clinic, primary and high schools, and our administrative offices. This is where Mrs. Tsehay Roschli first established SCV in 1986, starting with just 28 children rescued from the Bati famine region.",
    highlights: [
      "SCV-I and SCV-II Children's Villages",
      "Selam Technical & Vocational College with 11 departments",
      "Selam Clinic providing healthcare to children and the community",
      "Selam Primary and High Schools",
      "Day Care Center for children of working mothers",
      "Community support programs including Women's Economic Empowerment",
    ],
    programs: [
      "Family Model Village Child Care",
      "Youth Support Program",
      "Day Care Center",
      "School Feeding",
      "Educational Support",
      "Health & Clinic Service",
      "Destitute Elderly Women Support",
      "Hygiene Kit Support for Girls",
      "Women Economic Empowerment",
      "Technical & Vocational Training",
    ],
    established: "1986",
    image: "/images/locations/aa-700x450.jpg",
    coordinates: { lat: 9.0274, lng: 38.8316 },
  },
  {
    slug: "sheno",
    name: "Sheno",
    region: "North Shewa Zone, Oromia Region",
    description:
      "The Sheno campus extends our reach beyond the capital to serve vulnerable children and communities in the North Shewa Zone of the Oromia Region. This location focuses on agricultural training and community development programs, leveraging the agricultural potential of the region to provide vocational skills and livelihood opportunities for youth and women.",
    highlights: [
      "Agricultural vocational training center",
      "Community outreach programs",
      "Youth skills development",
      "Rural livelihood support",
    ],
    programs: [
      "Agricultural Training",
      "Community Support",
      "Youth Development",
    ],
    established: "2010",
    image: "/images/locations/sheno.jpg",
    coordinates: { lat: 9.3333, lng: 39.3000 },
  },
  {
    slug: "welayita-sodo",
    name: "Welayita Sodo",
    region: "South Ethiopia Regional State",
    description:
      "Our Welayita Sodo presence demonstrates SCV's commitment to expanding services across Ethiopia. Located in the South Ethiopia Regional State, this site focuses on community-based child care support and educational programs, working closely with local communities to address the needs of orphaned and vulnerable children in the region.",
    highlights: [
      "Community-based child care support",
      "Educational programs for vulnerable children",
      "Collaboration with local government and NGOs",
      "Capacity building for local caregivers",
    ],
    programs: [
      "Community Child Care Support",
      "Educational Support",
      "Capacity Building",
    ],
    established: "2015",
    image: "/images/locations/welayita-sodo.jpg",
    coordinates: { lat: 6.8541, lng: 37.7612 },
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
