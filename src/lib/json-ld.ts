import { siteSettings } from "@/data/site-settings";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Selam Children's Village",
    alternateName: "SCV",
    url: "https://www.selamchildrenvillage.org",
    logo: "https://www.selamchildrenvillage.org/logo.png",
    description: siteSettings.description,
    foundingDate: "1986",
    founder: {
      "@type": "Person",
      name: "Mrs. Tsehay Roschli",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kotebe, near Hana Mariam Church",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
      postalCode: "8075",
    },
    contactPoint: siteSettings.contact.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.number,
      contactType: p.label,
    })),
    sameAs: [
      siteSettings.socials.facebook,
      siteSettings.socials.instagram,
      siteSettings.socials.twitter,
      siteSettings.socials.youtube,
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteSettings.map.lat,
      longitude: siteSettings.map.lng,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    image: article.image,
    publisher: {
      "@type": "Organization",
      name: "Selam Children's Village",
      url: "https://www.selamchildrenvillage.org",
    },
  };
}
