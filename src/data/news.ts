/**
 * News & Articles data.
 *
 * Getter functions try the CMS API first (when CMS_API_URL is set) and
 * fall back to the static array below.
 */

import { cmsGet } from "@/lib/cms";

export interface NewsArticle {
  /** URL-friendly identifier */
  slug: string;
  /** Display title */
  title: string;
  /** Publication date (ISO 8601) */
  date: string;
  /** Category label for filtering / badges */
  category: "News" | "Events" | "Updates" | "Campaign";
  /** Short summary shown on listing cards */
  excerpt: string;
  /** Full article body (plain text paragraphs separated by \n\n) */
  content: string;
  /** Path to featured image in /public */
  image: string;

  /* ── SEO ───────────────────────────────────────────────── */
  seoTitle: string;
  seoDescription: string;
}

// ---------------------------------------------------------------------------
// All articles, newest first
// ---------------------------------------------------------------------------

export const newsArticles: NewsArticle[] = [
  {
    slug: "182-youth-graduate-from-beyepp",
    title: "182 Youth Graduate from Bavarian Ethiopian Youth Employment Promotion Project (BEYEPP)",
    date: "2025-08-11",
    category: "News",
    excerpt: "We are proud to announce that 182 youth have successfully graduated from the BEYEPP project in Addis Ababa after an intensive six-month vocational training program.",
    content: `We are proud to announce that 182 youth have successfully graduated from the Bavarian Ethiopian Youth Employment Promotion Project (BEYEPP) in Addis Ababa!

The youths completed an intensive six-month vocational training program that combined four months of classroom instruction with two months of practical cooperative training. The training covered five key fields: Woodwork, Garment Making and Fashion, Electrical Equipment Maintenance, Building Electrical Installation & Solar, and Urban Agriculture.

The graduation ceremony, held at Selam Children's Village, featured remarks from distinguished guests including Mrs. Tsehay Roeschli, founder of SCV, Mr. Tibebu Leta (Dean of STVC), Marlyse Annoepel (Project Manager for bbw International – Bildungswerk der Bayerischen Wirtschaft (bbw) gGmbH), Dr. Mekdelawit Yeshetila from the Bavarian Office Africa, and Ms. Rebecca Alt of the German Embassy.

A graduate representative shared an inspiring testimony about how the program transformed their skills and career prospects. This transformative initiative was made possible through the generous support of the Bavarian Chancellery, with implementation by bbw International.

We extend our sincere gratitude to our donors and all partner companies. These graduates are now prepared to make meaningful contributions to their communities and Ethiopia's growing economy!`,
    image: "/images/news/beyepp-graduation.jpg",
    seoTitle: "182 Youth Graduate from BEYEPP – Selam Children's Village",
    seoDescription: "182 youth graduated from the Bavarian Ethiopian Youth Employment Promotion Project after intensive vocational training in woodwork, garment, electrical, solar, and agriculture.",
  },
  {
    slug: "fundraising-for-water-well-drilling",
    title: "Fundraising for Water Well Drilling",
    date: "2025-04-29",
    category: "Campaign",
    excerpt: "Our fundraising dinner raised 10.5 million ETB for drilling a water borehole — 58% of the 18 million ETB total budget required.",
    content: `We are thrilled to share that our fundraising dinner held at Selam Children's Village-ROFAM Restaurant was a huge success! Thanks to the generosity of individuals and institutions, we raised a total of 10.5 million ETB for the drilling of the water borehole, 58 percent of the total budget required which is 18 million ETB.

Some of the contributions were:
– Cooperative Bank of Oromia (COOP): 1.5 million ETB
– Ato Berhanu Gurmesa / Hareg Import and Export: Submersible pump worth 1.8 million ETB
– Mrs. Tsehay Roeschli's friends: 1.2 million ETB
– Cesse & Families from Netherlands: 10,000 USD
– Baurau LLC: 5,000 USD
– Markos Abaloko & his friends from USA: 3,900 USD

We also received contributions from various companies, NGOs, former Selam grownups, and staff. The fundraising dinner was hosted by Ato Binyam, Founder & Owner of Ethiopia's Lijoch TV.

We are deeply grateful for all your support. Your contributions are vital to creating a clean and sustainable water source at SCV.

This fundraising effort is a testament to how any challenge can be overcome when we collaborate. As the saying goes in Amharic, "50 lemons are heavy for one person but easy for 50 people."

We were honored to have guests including GA members, board members, institutions, individuals, and delegates from Switzerland.

If you still want to support, you can donate through telebirr number 0993242424 or:
Cooperative Bank of Oromia (Acct #: 1000072466431)
Enat Bank (Acct #: 1611215708017001)
Commercial Bank of Ethiopia (Acct #: 1000005058558)
Berhan Bank (Acct #: 2601000013871)

Send us the slip after making the donation and we will prepare an appreciation letter. Thank you for making a difference!`,
    image: "/images/news/water-well-fundraising.jpg",
    seoTitle: "Fundraising for Water Well Drilling – Selam Children's Village",
    seoDescription: "SCV raised 10.5 million ETB at a fundraising dinner for drilling a water borehole. Learn how you can still contribute to clean water access.",
  },
  {
    slug: "girls-be-ambitious-project-graduation-ceremony",
    title: "Girls Be Ambitious Project Graduation Ceremony",
    date: "2025-04-09",
    category: "Events",
    excerpt: "114 women graduated from the Girls Be Ambitious Project, completing short-term training in sewing Female Sanitary Shorts for sustainable livelihoods.",
    content: `We have celebrated the graduation of 114 women from the Girls Be Ambitious Project at Selam Children's Village/Selam Technical and Vocational College! These women completed short-term training in sewing Female Sanitary Shorts, equipping them with valuable skills for sustainable livelihoods.

This initiative, part of the UNIDO-led Industrial Vocational Training Program in Africa and Asia, empowers women with Japanese technology to produce safe, reusable sanitary products — helping reduce menstrual stigma, improve public health, and create economic opportunities.

The graduation ceremony was attended by different honorable guests including; Mr. Netsu Shuntaro, Deputy Chief of Mission of the Embassy of Japan to Ethiopia, Mr. Muhdin Abba Mogga, Training and Institutional Capacity Building Lead Executive Officer, Ministry of Labor & Skills, Mr. Bogale Feleke, UNIDO Sub Regional Office Representative, Ms. Azusa Matsumoto, UNIDO ITPO Tokyo, Ms. Akiko Shinoda, ITOCHU Corporation, Ethiopia General Manager, and Mr. Solomon Chali, Executive Director of SCV.

The project was made possible with the support of: Government of Japan, UNIDO ITPO Tokyo, ITOCHU Corporation, and Be-A Company.`,
    image: "/images/news/girls-be-ambitious.jpg",
    seoTitle: "Girls Be Ambitious Project Graduation – Selam Children's Village",
    seoDescription: "114 women graduated from the Girls Be Ambitious Project, trained in sewing reusable sanitary products through a UNIDO-led vocational program.",
  },
  {
    slug: "annual-general-assembly-meeting-2025",
    title: "Annual General Assembly Meeting",
    date: "2025-03-17",
    category: "Updates",
    excerpt: "The Annual General Assembly of SCV was held on March 15, 2025, with the election of Professor Daniel Kitaw as new chairperson.",
    content: `We are excited to announce that the Annual General Assembly Meeting of Selam Children's Village was successfully held on March 15, 2025!

The meeting commenced with the election of new GA leadership members to replace those who have completed their terms. Professor Daniel Kitaw has been elected as the new chairperson, replacing Dr. Wondwossen Tesfaye, who has served as the GA chairperson for two terms.

The GA thoroughly reviewed key organizational documents, including the 2024 report and 2025 plan of Selam Children's Village, as well as RoFam & TRIAE, the IGA wing of SCV. An external audit report was also presented by auditors. After a productive discussion, the GA endorsed all the reports and plan documents.`,
    image: "/images/news/general-assembly-2025.jpg",
    seoTitle: "Annual General Assembly Meeting 2025 – Selam Children's Village",
    seoDescription: "SCV's Annual General Assembly elected Professor Daniel Kitaw as new chairperson and endorsed the 2024 report and 2025 plan.",
  },
  {
    slug: "annual-executive-board-meeting",
    title: "Annual Executive Board Meeting",
    date: "2025-02-26",
    category: "Updates",
    excerpt: "The annual review meeting of SCV's Executive Board took place in Bishoftu, reviewing the 2024 annual report and 2025 plan.",
    content: `The annual review meeting of Selam Children's Village (SCV) Executive Board took place in Bishoftu on February 22-23, 2025. During this meeting, the board thoroughly reviewed the 2024 annual report and the 2025 annual plan for both SCV and TRIAE. Additionally, various significant organizational issues were addressed, providing direction and making important decisions to guide the future of the organization.`,
    image: "/images/news/executive-board-2025.jpg",
    seoTitle: "Annual Executive Board Meeting – Selam Children's Village",
    seoDescription: "SCV Executive Board reviewed the 2024 annual report and 2025 plan during its annual meeting in Bishoftu.",
  },
  {
    slug: "acso-higher-officials-visit-scv",
    title: "ACSO Higher Officials Visit SCV",
    date: "2025-02-21",
    category: "News",
    excerpt: "A delegation from the Authority for Civil Society Organizations (ACSO), led by Director General Ato Samson Biratu, toured SCV's key programs.",
    content: `Today, we were honored to host a delegation from the Authority for Civil Society Organizations (ACSO), led by Director General Ato Samson Biratu, and two Deputy Director Generals – Ato Fasikaw Molla, and Ato Mesfin Hailu.

The team toured our key programs, including the Day Care Center, Family Houses, Selam Technical and Vocational College's Hospitality Training Center, and RoFam, our Income-Generating Activities (IGA) wing. The higher officials commended the remarkable contributions we are making to the community, particularly in terms of our urban agriculture initiatives, which align with national development priorities.

They praised SCV's IGA wing and youth employment initiatives as a model that can be scaled up by other institutions. The ACSO team also reaffirmed their commitment to supporting our work, calling it a valuable asset for the country.

We are grateful for their visit and recognition! Together, we'll continue creating opportunities and driving sustainable development for our communities.`,
    image: "/images/news/acso-visit.jpg",
    seoTitle: "ACSO Higher Officials Visit SCV – Selam Children's Village",
    seoDescription: "ACSO Director General and deputies visited SCV, praising the youth employment initiatives and urban agriculture as a scalable model.",
  },
  {
    slug: "stakeholders-visit-at-misale-driving-academy",
    title: "Stakeholders Visit at MISALE Driving Academy",
    date: "2025-02-13",
    category: "News",
    excerpt: "Addis Ababa Driver and Vehicle Authority officials visited Misale Driver Training Academy and were impressed with the facilities.",
    content: `We were honored to have Ato Bedelu Lelisa, General Manager of the Driver Department at Addis Ababa Driver and Vehicle Authority visit Misale Driver Training Academy, which recently re-organized as MISALE Chora Plc. Joining him was Tadelech Huleqa, Director of Driving Institutions Competency Assurance and Teshome Taye, team leader.

The team was warmly welcomed by Ato Solomon Chali, Executive Director of Selam Children's Village. After a brief presentation, they toured various facilities, including the exam center, simulator section, staff room, and the heavy-duty vehicle maintenance academy.

The visiting team was truly impressed with the academy's facilities and expressed their commitment to collaborating for efficient resource utilization and future support!`,
    image: "/images/news/misale-stakeholders.jpg",
    seoTitle: "Stakeholders Visit at MISALE Driving Academy – Selam Children's Village",
    seoDescription: "Addis Ababa Driver and Vehicle Authority officials toured Misale Driver Training Academy and committed to future collaboration.",
  },
  {
    slug: "annual-review-meeting",
    title: "Annual Review Meeting",
    date: "2025-02-10",
    category: "Updates",
    excerpt: "SCV held its 2024 Annual Review Meeting with Senior and Extended Management Members from CYC, STVC, and Head Office.",
    content: `Selam Children's Village held its 2024 Annual Review Meeting from February 7-8, 2025. Senior and Extended Management Members from CYC, STVC, and Head Office including management members from the two IGA wings, TRIAE, and ROFAM were in attendance.

The 2024 annual report was presented and discussed, along with key focus areas for the 2025 plan. Executive Director Ato Solomon Chali closed the meeting, thanking everyone for their commitment and providing direction for the upcoming budget year.`,
    image: "/images/news/annual-review-2025.jpg",
    seoTitle: "2024 Annual Review Meeting – Selam Children's Village",
    seoDescription: "SCV presented and discussed the 2024 annual report and key focus areas for the 2025 plan at its Annual Review Meeting.",
  },
  {
    slug: "joint-executive-board-meeting",
    title: "Joint Executive Board Meeting",
    date: "2024-10-11",
    category: "Updates",
    excerpt: "SCV hosted a two-day joint Executive Board meeting with participants from SCV and Selam Charity Switzerland.",
    content: `On October 11-12, 2024, Selam Children's Village successfully hosted a two-day joint Executive Board meeting in Addis Ababa with participants from Selam Children's Village and Selam Charity Switzerland.

During this productive gathering, the joint board addressed high-level strategic issues and discussed and endorsed a code of cooperation. Various working papers were presented, discussed in depth, and got approval by the board members.

The meeting concluded with a heartfelt moment as the two board members planted seedlings at the memorial park at SCV 2, honoring the legacy and major supporters of Selam Children's Village.`,
    image: "/images/news/joint-board.jpg",
    seoTitle: "Joint Executive Board Meeting – Selam Children's Village",
    seoDescription: "SCV and Selam Charity Switzerland held a joint Executive Board meeting addressing strategic issues and endorsing a code of cooperation.",
  },
  {
    slug: "semi-independent-living-sil-youths-graduation",
    title: "Semi-Independent Living (SIL) Youths Graduation",
    date: "2024-10-03",
    category: "Events",
    excerpt: "SCV celebrated the achievements of SIL program youths who graduated from various universities and colleges.",
    content: `Selam Children's Village organized a ceremony on October 3, 2024, to celebrate the achievements of youths living in the Semi-Independent Living (SIL) program who graduated from various government and private universities and colleges. The ceremony was facilitated by the Youth Support Department, the event aimed to recognize the hard work and dedication of these young individuals.

The ceremony was attended by Wro Tsehay Roeschli, the founder of SCV; Mr. Solomon Chali, SCV Executive Director; Mr. Amanuel Grunder, Program Director; and Ms. Reta Lusser from Selam Charity Switzerland. Each guest had the opportunity to share encouraging messages and best wishes for the graduates. Two representatives from the graduating youths expressed their gratitude to SCV for the support they received in reaching this significant milestone.

The event concluded with special recognition for two students who achieved a CGPA above 3.0, highlighting their academic excellence. All graduates received gifts, celebrating their accomplishments and marking the beginning of their next chapter.`,
    image: "/images/news/sil-graduation.jpg",
    seoTitle: "SIL Youths Graduation Ceremony – Selam Children's Village",
    seoDescription: "SCV celebrated the graduation of Semi-Independent Living program youths from universities and colleges, recognizing their academic excellence.",
  },
  {
    slug: "roche-ambassadors-visit-2024",
    title: "Roche Ambassadors Visit",
    date: "2024-10-01",
    category: "News",
    excerpt: "Roche Ambassadors from various countries visited SCV, touring the daycare center, family houses, and Selam Technical & Vocational College.",
    content: `On October 1, 2024, Roche Ambassadors from various countries visited Selam Children's Village (SCV), welcomed by Wro Tsehay Roeschli, SCV founder; Mr. Solomon Chali, SCV Executive Director; and Mr. Amanuel Grunder, Program Director from Selam Charity Switzerland. The visit commenced with a round-table introduction, allowing the delegation to meet SCV's management team, followed by a presentation by Mr. Nigussie Eshetie that outlined SCV's mission and brief the Children, Youth & Community Support (CYC) programs.

The ambassadors then toured several key areas within SCV, starting with the daycare center, where they interacted with staff and children. They visited two of the family houses, gaining insight into daily life in the village, and spent time at the kindergarten. A significant part of their visit included engaging with youths in the Semi-Independent Living (SIL) Program, where they learned about the challenges and aspirations of the Roche supported youths.

In the afternoon, the delegation explored the Selam Technical & Vocational College, focusing on departments such as Manufacturing, Electricity and Electronics, Heavy-Duty Vehicles and Earth Moving Machinery Maintenance, and the Misale Drivers Academy. The visit concluded with a feedback session, during which the ambassadors reflected on their experiences and expressed their appreciation about the impactful work being carried out at SCV.`,
    image: "/images/news/roche-visit-2024.jpg",
    seoTitle: "Roche Ambassadors Visit 2024 – Selam Children's Village",
    seoDescription: "Roche Ambassadors toured SCV's daycare, family houses, kindergarten, SIL program, and TVET college departments.",
  },
  {
    slug: "eka-kotebe-general-hospital-partnership-visit",
    title: "Eka Kotebe General Hospital Partnership Visit",
    date: "2024-09-23",
    category: "News",
    excerpt: "Management teams from SCV and Eka Kotebe General Hospital exchanged visits to explore potential collaborations.",
    content: `On September 23, 2024, members of the management teams from Selam Children's Village (SCV), TRIAE, and ROFAM visited Eka Kotebe General Hospital. This visit provided an opportunity for the teams to engage directly and explore potential collaborations. During the visit, they toured the hospital's various facilities.

In a reciprocal gesture, Eka Kotebe General Hospital management also visited SCV on October 7, 2024, fostering mutual understanding and cooperation. They visited family houses, the daycare center, and Selam Technical & Vocational College, as well as different departments of ROFAM and TRIAE. This exchange allowed both organizations to share insights and experiences, enhancing their partnership.

The primary aim of these visits was to strengthen collaboration and address various issues of the community. By working together, they hope to enhance their impact on the communities they serve and improve the services they provide. This partnership will facilitate resource sharing and foster innovative solutions to common challenges, ultimately benefiting those in need.`,
    image: "/images/news/eka-hospital.jpg",
    seoTitle: "Eka Kotebe Hospital Partnership Visit – Selam Children's Village",
    seoDescription: "SCV and Eka Kotebe General Hospital exchanged visits to strengthen collaboration and explore community-focused partnerships.",
  },
  {
    slug: "selam-day-care-10th-anniversary",
    title: "Selam Day Care 10th Anniversary",
    date: "2024-07-23",
    category: "Events",
    excerpt: "SCV celebrated the 10th anniversary of its Day Care Center, which provides free child care for children of vulnerable single mothers.",
    content: `Selam Children's Village (SCV) celebrated the 10th anniversary of its Selam Day Care Center, a community support program that provides free child care services to vulnerable children of single mothers.

The day care center, which has been operating for a decade, offers comprehensive support to the children, including three nutritious meals per day, playtime, and nap times. This allows the mothers to focus on their livelihoods and daily activities without having to worry about their children's care.

The anniversary celebration was held in a vibrant and colorful event, attended by the SCV Executive Board Chairman Wondwossen Teshome, CYC Director Nigussie Eshetie, SCV founder Mrs. Tsehay Roeschli, representatives from government and non-governmental organizations, and the day care center as well as SCV staff.

During the event, several mothers who have been benefiting from the center's services shared their testimonies, expressing gratitude for the support provided to their families. Additionally, four nannies who have dedicated 10 years of service to the day care center were recognized and received certificates for their commitment.`,
    image: "/images/news/daycare-anniversary.jpg",
    seoTitle: "Selam Day Care 10th Anniversary – Selam Children's Village",
    seoDescription: "SCV celebrated 10 years of its Day Care Center providing free child care, meals, and support to children of vulnerable single mothers.",
  },
  {
    slug: "annual-general-assembly-meeting-2024",
    title: "Annual General Assembly Meeting 2024",
    date: "2024-03-18",
    category: "Updates",
    excerpt: "SCV hosted its 16th regular General Assembly meeting, endorsing the five-year strategic plan for 2024–2028.",
    content: `Selam Children's Village (SCV) hosted its 16th regular General Assembly meeting on March 16, 2024. The assembly began by paying tribute to two esteemed members, Dr. Tarekegn Berhanu and Ato Mamuye Desaelgen, who had recently passed away. A minute of silence was observed to honor their contributions and remember their invaluable service to SCV.

The General Assembly reviewed crucial documents, including the 2023 annual report, the 2024 annual plan, and audit reports for both SCV and TRIAE. After extensive discussions, the general assembly endorsed these documents. Furthermore, the GA approved a comprehensive five-year strategic plan that will be implemented from 2024 to 2028.

Overall, the successful General Assembly meeting signifies the dedication of SCV to transparency, accountability, and strategic planning. It sets a strong foundation for the organization to continue its impactful work in empowering and supporting vulnerable children and communities.`,
    image: "/images/news/general-assembly-2024.jpg",
    seoTitle: "Annual General Assembly 2024 – Selam Children's Village",
    seoDescription: "SCV's 16th General Assembly endorsed the 2023 report, 2024 plan, and a five-year strategic plan for 2024–2028.",
  },
  {
    slug: "selam-childrens-village-sheno-center-inaugurated",
    title: "Selam Children's Village Sheno Center Inaugurated",
    date: "2024-03-11",
    category: "News",
    excerpt: "SCV inaugurated its first-ever center outside Addis Ababa in Sheno City, Oromia Regional State.",
    content: `Selam Children's Village has been operating in Addis Ababa since its establishment in 1986. Recently, SCV has embarked on a vision to expand its community services to other regions of the country. One of the chosen areas is the Sheno City Administration in the Oromia Regional State. On March 9, 2024, SCV inaugurated its first-ever center outside of Addis Ababa.

The inauguration ceremony was a vibrant event, graced by the presence of Mrs. Genet, the Deputy Mayor of Sheno City, Mrs. Tsehay Roeschli, the founder of SCV, Ato Wondwoseen Teshome, the Chairman of the Executive Board, Ato Solomon Chali, Executive Director of SCV as well as board members and management representatives from Selam Charity Switzerland. Additionally, esteemed elders and religious leaders from Sheno City were in attendance.

In its initial phase, SCV will focus on interventions such as school feeding, women's economic empowerment, and sharing experiences from Selam Technical and Vocational College. As part of the inauguration ceremony, a project agreement was signed with relevant officials from the respective sectors. SCV remains committed to expanding its services to other regions of the country and reaching those who have been unreached.`,
    image: "/images/news/sheno-inauguration.jpg",
    seoTitle: "Sheno Center Inaugurated – Selam Children's Village",
    seoDescription: "SCV opened its first center outside Addis Ababa in Sheno City, focusing on school feeding, women's empowerment, and vocational training.",
  },
  {
    slug: "sida-director-general-visited-scv",
    title: "SIDA Director General Visited SCV",
    date: "2024-01-26",
    category: "News",
    excerpt: "Mr. Jakob Granit, Director-General of Sweden's SIDA, visited SCV to explore partnerships in skills development and digitalization.",
    content: `On January 26, 2024, Mr. Jakob Granit, the Director-General of The Swedish International Development Cooperation Agency (Sida), visited Selam Children's Village. Accompanying him were Mr. Tomas Bergenholtz, Senior Advisor to the Director General at Sida, Mr. Ulf Kallstig, Head of the Africa Department at Sida, and Ms. Aurelia Calabro, Director and UNIDO Representative, Regional Office Hub in Ethiopia.

The purpose of the visit was to promote partnerships and explore avenues for improved synergies. The team aimed to discuss current challenges and opportunities within the areas of skills development, research, digitalization, and the role of the private sector in development.

During their visit, the team had the opportunity to tour various workshops at the college, including the Misale driving academy. This allowed them to gain firsthand insight into the vocational training programs offered and witness the impact of skill development initiatives on the lives of youths.`,
    image: "/images/news/sida-visit.jpg",
    seoTitle: "SIDA Director General Visited SCV – Selam Children's Village",
    seoDescription: "Sweden's SIDA Director-General toured SCV's vocational college to explore partnerships in skills development, research, and digitalization.",
  },
  {
    slug: "enat-bank-mrs-tsehay-roeschli-branch-inaugurated",
    title: "Enat Bank Mrs. Tsehay Roeschli Branch Inaugurated",
    date: "2023-11-27",
    category: "News",
    excerpt: "Enat Bank inaugurated a new branch named in honor of Mrs. Tsehay Roeschli in recognition of her tireless efforts empowering women and mothers.",
    content: `Exciting news! Enat Bank has inaugurated a new branch, which has been named in honor of the remarkable Mrs. Tsehay Roeschli, founder of Selam Children's Village, in recognition of her tireless efforts in empowering women and mothers. Enat Bank commemorated this special occasion with distinguished guests, including the bank's management, SCV management, Executive Board members, the esteemed Ambassador of Selam Children's Village, Artist Ephrem Tadesse, and Mrs. Tsehay Roeschli herself.`,
    image: "/images/news/enat-bank.png",
    seoTitle: "Enat Bank Names Branch After Mrs. Tsehay Roeschli – Selam Children's Village",
    seoDescription: "Enat Bank inaugurated a branch named after SCV founder Mrs. Tsehay Roeschli, honoring her work empowering women and mothers.",
  },
  {
    slug: "artist-ephrem-tadesse-selected-as-ambassador",
    title: "Artist Ephrem Tadesse Selected as Ambassador of Selam Children's Village",
    date: "2023-10-27",
    category: "News",
    excerpt: "SCV launched its digital marketing resource mobilization with Artist Ephrem Tadesse selected as the organization's Ambassador.",
    content: `Ato Solomon Chali, SCV Executive Director officially announced the launching of Selam Children's Village Resource Mobilization through Digital Marketing. Her Excellency Etagegn Assefa, F.D.R.E Ministry of Women and Social Affairs delegate, government and non-government representatives, General Assembly and Board members, invited guests and staff attended the launching ceremony. Mrs. Tsehay Roeschli founder of SCV and Mrs. Genet Roeschli, Selam Charity Switzerland delivered a short message to the audience.

In addition, Ato Wondwossen Teshome, SCV's Executive Board Chairman invited individuals, investors, government and private organizations, companies, financial institutions and others to support Selam Children's Village.

On the launching ceremony, Artist Ephrem Tadesse was selected as "Ambassador" for SCV. "Ambassador" artist Ephrem has promised to represent SCV in different occasion and promote SCV and support to realize the resource mobilization effort.`,
    image: "/images/news/ephrem-ambassador.png",
    seoTitle: "Artist Ephrem Tadesse Named SCV Ambassador – Selam Children's Village",
    seoDescription: "Artist Ephrem Tadesse was selected as Ambassador of Selam Children's Village at the launch of SCV's digital marketing resource mobilization.",
  },
  {
    slug: "roche-ambassadors-visit-2023",
    title: "Roche Ambassadors Visit (2023)",
    date: "2023-10-05",
    category: "News",
    excerpt: "A delegation of 11 Roche Ambassadors visited SCV, touring programs from the daycare center to the Technical & Vocational College.",
    content: `Roche Ambassadors from different countries paid a visit to Selam Children's Villages on October 03, 2023. The delegation composed of 11 members, was welcomed by Wro Tsehay Roeschli, founder of SCV, Mr. Solomon Chali, SCV Executive Director, and Mr. Amanuel Grunder, Selam Charity Switzerland, Program Director.

After a quick round-table introduction, mainly to get familiar with SCV's management team, the team visited different programs of SCV. The visit began at SCV's compound 1, starting from the daycare center. The visiting team had the opportunity to interact with two of the family houses in Selam Children's Village. They have also visited the Kindergarten, Elementary, and High school.

In the afternoon, the team visited Selam Technical & Vocational College, mainly Manufacturing, Electricity and Electronics, Heavy-Duty Vehicles and Earth Moving Machineries Maintenance Department, and Misale Drivers Academy.

In addition, the Roche ambassadors spent some time with SCV youths who are in the Semi-Independent Living (SIL) Program. At last, the ambassadors concluded with a feedback session and they reflected that they were happy with what they had witnessed.

We would like to convey our heartfelt gratitude for the Ambassador's visit and the wonderful feedback we have received about our programs and the impact we are making.`,
    image: "/images/news/roche-visit-2023.png",
    seoTitle: "Roche Ambassadors Visit 2023 – Selam Children's Village",
    seoDescription: "11 Roche Ambassadors visited SCV, touring the daycare, family houses, schools, TVET college, and Semi-Independent Living program.",
  },
  {
    slug: "congratulation-to-mrs-tsehay-roschli",
    title: "Congratulation to Mrs. Tsehay Roschli (Eteye)!",
    date: "2023-09-18",
    category: "News",
    excerpt: "Mrs. Tsehay Roschli was honored by the Government of Ethiopia for her exemplary humanitarian works on National Kindness Day.",
    content: `It is with great pleasure to inform you all that the founder of Selam Children's Village Mrs. Tsehay Roschli (Eteye) was honored and recognized by the Government of Ethiopia for her exemplary humanitarian works and kindness she showed to others. Today, September 08, 2023 was remembered and celebrated at a national level with a theme of "Kindness for the Nation".

Mrs. Tsehay received her recognition certificate and a cup in the presence of higher government officials including Her Excellency Zahara Umud, House of Federation Deputy Speaker, Her Excellency Dr. Ergogie Tesfaye, Minster of Women, Children, and Social Affairs, His Excellency Binalf Andualem, Minister of Peace, His Excellency Samson Biratu, Director General of the Authority for Civil Society Organizations and other higher officials and representatives from government and non-government organizations.

On behalf of Selam Children's Village, we would like to express our heartfelt gratitude and congratulate Mrs. Tsehay and all her families for this remarkable achievement.`,
    image: "/images/news/tsehay-recognition.jpg",
    seoTitle: "Mrs. Tsehay Roschli Honored by Ethiopian Government – Selam Children's Village",
    seoDescription: "SCV founder Mrs. Tsehay Roschli was honored by the Ethiopian Government for exemplary humanitarian work on National Kindness Day.",
  },
  {
    slug: "ethio-telecom-supported-scv",
    title: "Ethio Telecom Supported SCV",
    date: "2023-09-18",
    category: "News",
    excerpt: "Ethio Telecom CEO and officials donated learning supplies to SCV children and youth on Ethiopia's National Kindness Day.",
    content: `On the occasion of National Kindness Day, Ethio Telecom CEO Ms. Frehiwot Tamru and other officials donated learning notebooks and supplies to Selam Children's Village children and youth.

The SCV Executive Board Chairman Ato Wondwossen Teshome, on behalf of Selam Children's Village, expressed gratitude for Ethio Telecom's generous support.`,
    image: "/images/news/ethio-telecom.jpg",
    seoTitle: "Ethio Telecom Supports SCV – Selam Children's Village",
    seoDescription: "Ethio Telecom donated learning supplies to SCV children and youth on National Kindness Day.",
  },
  {
    slug: "scv-held-the-annual-staff-meeting",
    title: "SCV Held the Annual Staff Meeting",
    date: "2023-05-20",
    category: "Updates",
    excerpt: "Selam Children's Village held its annual staff meeting to review the year and plan for the future.",
    content: `Selam Children's Village held its annual staff meeting, bringing together staff from all departments to review the past year's achievements and plan for the upcoming period. The meeting served as an important platform for organizational alignment and team building.`,
    image: "/images/news/general-assembly-2024.jpg",
    seoTitle: "Annual Staff Meeting – Selam Children's Village",
    seoDescription: "SCV held its annual staff meeting to review achievements and plan for the upcoming period.",
  },
];

// ---------------------------------------------------------------------------
// CMS response shapes
// ---------------------------------------------------------------------------

interface CmsNewsItem {
  id: string;
  title: string;
  slug: string;
  publishDate: string;
  coverImage: string | null;
  excerpt: string | null;
  category: string;
  tags: string[];
  featured: boolean;
  body?: string;
  seoTitle?: string | null;
  seoDesc?: string | null;
}

function toArticle(n: CmsNewsItem): NewsArticle {
  return {
    slug: n.slug,
    title: n.title,
    date: n.publishDate,
    category: (n.category === "press" ? "News" : n.category === "story" ? "Updates" : "News") as NewsArticle["category"],
    excerpt: n.excerpt || "",
    content: n.body || n.excerpt || "",
    image: n.coverImage || "/images/news/general-assembly-2024.jpg",
    seoTitle: n.seoTitle || n.title,
    seoDescription: n.excerpt || "",
  };
}

// ---------------------------------------------------------------------------
// Helpers — try CMS API first, fall back to static data
// ---------------------------------------------------------------------------

export async function getNewsArticle(slug: string): Promise<NewsArticle | undefined> {
  const cms = await cmsGet<CmsNewsItem>(`/news/${slug}`);
  if (cms) return toArticle(cms);
  return newsArticles.find((a) => a.slug === slug);
}

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const cms = await cmsGet<{ data: CmsNewsItem[] }>("/news?limit=100");
  if (cms?.data?.length) return cms.data.map(toArticle);
  return newsArticles;
}

export async function getNewsArticlesByCategory(category: NewsArticle["category"]): Promise<NewsArticle[]> {
  const all = await getNewsArticles();
  return all.filter((a) => a.category === category);
}

export async function getRelatedArticles(currentSlug: string, limit = 3): Promise<NewsArticle[]> {
  const all = await getNewsArticles();
  return all.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
