export interface StaticPage {
  id: string;
  title: string;
  slug: string;
  heroImage: string | null;
  body: string;
  seoTitle: string | null;
  seoDesc: string | null;
  seoImage: string | null;
}

export const staticPages: StaticPage[] = [
  {
    id: "page-how-to-help",
    title: "How to Help",
    slug: "how-to-help",
    heroImage: null,
    seoTitle: "How to Help | Selam Children's Village",
    seoDesc: "Discover the many ways you can support Selam Children's Village and make a lasting impact.",
    seoImage: null,
    body: `## Make a Difference Today

There are many ways you can support Selam Children's Village and contribute to the welfare of vulnerable children and communities in Ethiopia.

### Donate
Your financial contribution directly supports our programs — from child care to vocational training. Every birr counts toward building a better future.

[Donate Now →](/get-involved/donate)

### Volunteer
Share your time and skills with us. Whether you're a professional, student, or retiree, your expertise can make a real impact.

[Become a Volunteer →](/get-involved/become-a-volunteer)

### Partner With Us
Organizations, businesses, and institutions can collaborate with us on projects, sponsor programs, or provide technical assistance.

[Be a Partner →](/get-involved/be-a-partner)

### Spread the Word
Share our story on social media, tell your friends and family, and help raise awareness about the needs of vulnerable children in Ethiopia.

### Sponsor a Child
You can directly sponsor a child's education, healthcare, and daily needs. Your sponsorship provides holistic support throughout their development.

---

*For more information on how you can help, please [contact us](/get-involved/contact-us).*`,
  },
  {
    id: "page-publication",
    title: "Publications",
    slug: "publication",
    heroImage: null,
    seoTitle: "Publications | Selam Children's Village",
    seoDesc: "Access our publications, research papers, and organizational documents.",
    seoImage: null,
    body: `## Our Publications

Selam Children's Village regularly publishes reports, research papers, and organizational documents to maintain transparency and share our impact with stakeholders.

### Available Publications

- **Annual Reports** — Comprehensive yearly reports detailing our programs, financials, and impact metrics
- **Research Papers** — Studies and research conducted in collaboration with academic institutions
- **Program Briefs** — Summaries of key programs and their outcomes
- **Impact Stories** — Narratives documenting the lives transformed through our work

### Access Our Documents

Our publications are available for download. For specific documents or custom reports, please [contact our communications team](/get-involved/contact-us).

---

*We are committed to transparency and accountability in all our operations.*`,
  },
  {
    id: "page-newsletter",
    title: "Newsletter & Magazine",
    slug: "newsletter-magazine",
    heroImage: null,
    seoTitle: "Newsletter & Magazine | Selam Children's Village",
    seoDesc: "Subscribe to our newsletter and read our latest magazine issues.",
    seoImage: null,
    body: `## Newsletter & Magazine

Stay connected with Selam Children's Village through our regular publications.

### Selam Newsletter
Our quarterly newsletter covers:
- Latest news and updates from all our centers
- Success stories from our programs
- Upcoming events and opportunities
- Partner spotlights and collaborations

### Selam Magazine
Our annual magazine provides in-depth features including:
- Photo essays from our programs
- Interviews with beneficiaries and staff
- Detailed program reports
- Year-in-review highlights

### Subscribe
To receive our newsletter directly in your inbox, please [contact us](/get-involved/contact-us) with your email address.

---

*Previous issues are available upon request.*`,
  },
  {
    id: "page-annual-report",
    title: "Annual Reports",
    slug: "annual-report",
    heroImage: null,
    seoTitle: "Annual Reports | Selam Children's Village",
    seoDesc: "View and download our annual reports documenting organizational performance and impact.",
    seoImage: null,
    body: `## Annual Reports

Our annual reports provide a comprehensive overview of Selam Children's Village activities, financial performance, and impact throughout the year.

### What's Inside Our Annual Reports

- **Executive Summary** — Key achievements and strategic highlights
- **Program Reports** — Detailed updates on all our programs and services
- **Financial Statements** — Audited financial reports and budget utilization
- **Impact Metrics** — Quantitative measures of our reach and outcomes
- **Stories of Change** — Personal narratives from beneficiaries
- **Partner Recognition** — Acknowledging our supporters and collaborators

### Available Reports

Annual reports for recent years are available for download. For older reports or specific financial documents, please [contact our finance department](/get-involved/contact-us).

---

*We believe in full transparency and are proud to share our progress with all stakeholders.*`,
  },
  {
    id: "page-audit-report",
    title: "Audit Reports",
    slug: "audit-report",
    heroImage: null,
    seoTitle: "Audit Reports | Selam Children's Village",
    seoDesc: "Access our externally audited financial reports ensuring transparency and accountability.",
    seoImage: null,
    body: `## Audit Reports

Selam Children's Village undergoes annual external audits to ensure the highest standards of financial accountability and transparency.

### Our Commitment to Transparency

We are audited annually by independent, certified public accounting firms. Our audit reports cover:

- **Financial Position** — Assets, liabilities, and fund balances
- **Revenue & Expenditure** — Detailed breakdown of income sources and program spending
- **Internal Controls** — Assessment of financial management systems
- **Compliance** — Adherence to local laws and international standards

### External Auditors

Our financial statements are audited by reputable Ethiopian audit firms in accordance with International Standards on Auditing (ISA).

### Access Audit Reports

For copies of our audit reports, please [contact our finance department](/get-involved/contact-us).

---

*Financial integrity is foundational to our mission and the trust placed in us by our donors and partners.*`,
  },
  {
    id: "page-policies",
    title: "Policies & Guidelines",
    slug: "policies-guidelines",
    heroImage: null,
    seoTitle: "Policies & Guidelines | Selam Children's Village",
    seoDesc: "Our organizational policies and operational guidelines.",
    seoImage: null,
    body: `## Policies & Guidelines

Selam Children's Village operates under comprehensive policies and guidelines that ensure the safety, well-being, and rights of all beneficiaries and stakeholders.

### Key Policy Areas

- **Child Protection Policy** — Comprehensive safeguarding measures for all children in our care
- **Code of Conduct** — Standards of behavior for staff, volunteers, and partners
- **Human Resources Policy** — Employment practices, benefits, and professional development
- **Financial Management Policy** — Budgeting, procurement, and expenditure guidelines
- **Environmental Policy** — Commitment to sustainable and environmentally responsible practices
- **Data Protection & Privacy** — Handling of personal information and confidential data
- **Anti-Fraud & Corruption Policy** — Zero tolerance for fraudulent activities

### Compliance

Our policies align with:
- Ethiopian Charities and Societies Proclamation
- International NGO standards and best practices
- UN Convention on the Rights of the Child
- Partner and donor requirements

### Access Our Policies

For copies of specific policies, please [contact our administration](/get-involved/contact-us).

---

*Our policies are regularly reviewed and updated to reflect best practices and evolving standards.*`,
  },
];

export function getStaticPage(slug: string): StaticPage | null {
  return staticPages.find((p) => p.slug === slug) ?? null;
}
