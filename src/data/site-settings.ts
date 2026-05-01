export const siteSettings = {
  name: "Selam Children's Village",
  tagline: "Transforming Lives. Four Decades of Nurturing Hope.",
  description:
    "Selam Children's Village is an Ethiopian non-profit organization established in 1986 by the visionary social worker Mrs. Tsehay Roschli. For four decades, we have been dedicated to providing comprehensive care, education, and vocational training to orphaned, abandoned, and vulnerable children and youth in Ethiopia.",
  founded: 1986,
  contact: {
    address: "Kotebe, near Hana Mariam Church, Addis Ababa, Ethiopia",
    poBox: "P.O. Box 8075",
    email: "info@selamchildrenvillage.org",
    phones: [
      { label: "Head Office", number: "+251-116-471052" },
      { label: "Resource Mobilization", number: "+251-116-460007" },
      { label: "Registrar", number: "+251-990-504779" },
      { label: "Dean", number: "+251-116-472517" },
    ],
  },
  socials: {
    facebook: "https://www.facebook.com/selamchildrensvillage",
    instagram: "https://www.instagram.com/selamchildrensvillage",
    twitter: "https://twitter.com/selamchildren",
    youtube: "https://www.youtube.com/@selamchildrensvillage",
  },
  map: {
    lat: 9.0274,
    lng: 38.8316,
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.8316!3d9.0274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnMzguNiJOIDM4wrA0OScwMy40IkU!5e0!3m2!1sen!2set!4v1234567890",
  },
  donate: {
    chapaEtbUrl: "https://chapa.link/donation/view/DN-7e5lUodNN6lL",
    chapaUsdUrl: "https://chapa.link/donation/view/DN-SIQR7rmPsCxL",
    gofundmeUrl:
      "https://www.gofundme.com/f/together-we-can-help-most-vulnerable-children",
  },
};

export const navigation = {
  topBar: [
    { label: "Donate", href: "/get-involved/donate" },
    { label: "Become a Volunteer", href: "/get-involved/become-a-volunteer" },
    { label: "Contact Us", href: "/get-involved/contact-us" },
  ],
  main: [
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "About Our Organization", href: "/about" },
        { label: "Who We Are", href: "/about/who-we-are" },
        { label: "Our History", href: "/about/our-history" },
        {
          label: "Vision, Mission & Core Values",
          href: "/about/vision-mission-core-values",
        },
        {
          label: "Executive Board Members",
          href: "/leadership/executive-board-members",
        },
        {
          label: "Senior Management Team",
          href: "/leadership/senior-management-team",
        },
        {
          label: "Extended Management Team",
          href: "/leadership/extended-management-team",
        },
        {
          label: "Board Switzerland",
          href: "/leadership/board-switzerland",
        },
      ],
    },
    {
      label: "What We Do",
      href: "/what-we-do",
      children: [
        {
          label: "Children, Youth & Community Support",
          href: "/what-we-do/children-youth-community-support",
          children: [
            {
              label: "Family Model Village",
              href: "/what-we-do/family-model-village-child-care",
            },
            { label: "Day Care", href: "/what-we-do/day-care" },
            {
              label: "Youth Support Program",
              href: "/what-we-do/youth-support-program",
            },
            { label: "School Feeding", href: "/what-we-do/school-feeding" },
            {
              label: "Educational Support",
              href: "/what-we-do/educational-support",
            },
            { label: "Selam Clinic", href: "/what-we-do/selam-clinic" },
          ],
        },
        {
          label: "Technical & Vocational Training",
          href: "/technical-vocational-training",
        },
        { label: "All Projects", href: "/all-projects" },
      ],
    },
    {
      label: "News & Resources",
      href: "/news-updates",
      children: [
        { label: "News & Updates", href: "/news-updates" },
        { label: "Event Calendar", href: "/event-calendar" },
        { label: "Gallery", href: "/gallery" },
        { label: "Publications", href: "/resources/publication" },
        {
          label: "Newsletter & Magazine",
          href: "/resources/newsletter-magazine",
        },
        { label: "Annual Report", href: "/resources/annual-report" },
        { label: "Audit Report", href: "/resources/audit-report" },
        {
          label: "Policies & Guidelines",
          href: "/resources/policies-guidelines",
        },
      ],
    },
    {
      label: "Get Involved",
      href: "/get-involved",
      children: [
        { label: "How to Help", href: "/get-involved/how-to-help" },
        { label: "Donate", href: "/get-involved/donate" },
        {
          label: "Become a Volunteer",
          href: "/get-involved/become-a-volunteer",
        },
        { label: "Job Openings", href: "/job-openings" },
        { label: "Contact Us", href: "/get-involved/contact-us" },
      ],
    },
  ],
};
