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
    { label: "Jobs", href: "/job-openings" },
    { label: "Donate", href: "/get-involved/donate" },
    { label: "Become a Volunteer", href: "/get-involved/become-a-volunteer" },
    { label: "Contact Us", href: "/get-involved/contact-us" },
  ],
  main: [
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
            {
              label: "Youth Support Program",
              href: "/what-we-do/youth-support-program",
            },
            { label: "Selam Clinic", href: "/what-we-do/selam-clinic" },
          ],
        },
        {
          label: "Community Support",
          href: "/what-we-do/children-youth-community-support",
          children: [
            { label: "Day Care", href: "/what-we-do/day-care" },
            { label: "School Feeding", href: "/what-we-do/school-feeding" },
            {
              label: "Women Economic Empowerment",
              href: "/what-we-do/women-economic-empowerment",
            },
            {
              label: "Hygiene Kit Support for Girls",
              href: "/what-we-do/hygiene-kit-support-for-girls",
            },
            {
              label: "Educational Support",
              href: "/what-we-do/educational-support",
            },
            {
              label: "Destitute Elderly Women Support",
              href: "/what-we-do/destitute-elderly-women-support",
            },
          ],
        },
        {
          label: "Selam TVET College",
          href: "/technical-vocational-training",
          children: [
            {
              label: "Trainings",
              href: "/technical-vocational-training",
            },
            { label: "Projects", href: "/all-projects" },
          ],
        },
      ],
    },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Who We Are", href: "/about/who-we-are" },
        { label: "Our History", href: "/about/our-history" },
        { label: "Vision, Mission & Values", href: "/about/vision-mission-core-values" },
      ],
    },
    {
      label: "Where We Work",
      href: "/where-we-work",
      children: [
        { label: "Addis Ababa", href: "/where-we-work/addis-ababa" },
        { label: "Sheno", href: "/where-we-work/sheno" },
        { label: "Welayita Sodo", href: "/where-we-work/welayita-sodo" },
      ],
    },
    {
      label: "Get Involved",
      href: "/get-involved",
      children: [
        { label: "Donate", href: "/get-involved/donate" },
        {
          label: "Volunteer",
          href: "/get-involved/become-a-volunteer",
        },
        { label: "Be A Partner", href: "/get-involved/be-a-partner" },
        { label: "Careers", href: "/job-openings" },
        { label: "Contact Us", href: "/get-involved/contact-us" },
      ],
    },
    {
      label: "Latest",
      href: "/news-updates",
      children: [
        { label: "News", href: "/news-updates" },
        { label: "Activities", href: "/activities" },
      ],
    },
    {
      label: "Resources",
      href: "/resources/publication",
      children: [
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
  ],
};
