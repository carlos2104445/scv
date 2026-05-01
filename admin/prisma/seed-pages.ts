const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const pages = [
    {
      title: 'Policies & Guidelines',
      slug: 'policies-guidelines',
      body: '## Our Policies\n\nComing soon.',
      status: 'PUBLISHED'
    },
    {
      title: 'Audit Report',
      slug: 'audit-report',
      body: '## Audit Reports\n\nComing soon.',
      status: 'PUBLISHED'
    },
    {
      title: 'Annual Report',
      slug: 'annual-report',
      body: '## Annual Reports\n\nComing soon.',
      status: 'PUBLISHED'
    },
    {
      title: 'Publications',
      slug: 'publication',
      body: '## Publications\n\nComing soon.',
      status: 'PUBLISHED'
    },
    {
      title: 'Newsletter & Magazine',
      slug: 'newsletter-magazine',
      body: '## Newsletters\n\nComing soon.',
      status: 'PUBLISHED'
    },
    {
      title: 'Vision, Mission & Core Values',
      slug: 'vision-mission-core-values',
      body: '<h2>Our Vision</h2><p>To see the most vulnerable children and youth of Ethiopia received care and education to realize their full potential.</p><h2>Our Mission</h2><p>SCV is committed to promote child care and positive youth development through provision of holistic services, and enabling community to care for the most vulnerable children and youth of Ethiopia.</p><h2>Core Values</h2><ul><li>Accountability</li><li>Compassionate</li><li>Professionalism</li><li>Responsiveness</li><li>Stewardship</li><li>Team Spirit</li><li>Transparency</li></ul>',
      status: 'PUBLISHED'
    },
    {
      title: 'How to Help',
      slug: 'how-to-help',
      body: '<h2>Donate</h2><p>Support our programs with a one-time or recurring donation via Chapa or bank transfer.</p><h2>Volunteer</h2><p>Share your skills and time to make a direct impact on the lives of children and youth.</p><h2>Partner With Us</h2><p>Explore partnership opportunities for organizations and businesses.</p><h2>Sponsor a Child</h2><p>Provide long-term support for a child\'s education, healthcare, and wellbeing.</p>',
      status: 'PUBLISHED'
    }
  ];

  for (const p of pages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }
  console.log('Pages seeded!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
