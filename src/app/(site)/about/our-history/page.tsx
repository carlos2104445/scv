"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PageHero } from "@/components/blocks/PageHero";

const timeline = [
  { year: "1986", title: "Foundation of Selam Children's Village", desc: "Mrs. Tsehay Roschli establishes Selam Children's Village in Addis Ababa to care for orphaned and vulnerable children.", imageUrl: "/images/history/foundation-1986.jpg" },
  { year: "1987", title: "Official Inauguration & Primary School", desc: "The Village is officially inaugurated in the presence of high government officials, and Selam Primary School 1 is established.", imageUrl: "/images/history/scv-founders.jpg" },
  { year: "1988", title: "Selam Clinic Established", desc: "With funding from the Embassy of Switzerland, Selam Clinic is established to provide health services to needy children and community members.", imageUrl: "/images/history/selam-construction1.jpg" },
  { year: "1989", title: "Selam Technical and Vocational College", desc: "Selam Technical & Vocational Education Training College (STVC) is established to equip youth with marketable skills.", imageUrl: "/images/history/selam-school1.jpg" },
  { year: "1990", title: "Selam Primary Schools (Grade 7 & 8)", desc: "Selam Primary Schools (Grade 7 & 8) are established, expanding the educational services for children.", imageUrl: "/images/history/selam-construction2.jpg" },
  { year: "1994", title: "Selam High School", desc: "Selam High School is inaugurated to continue the educational journey of students through higher grades.", imageUrl: "/images/history/history-overview.jpg" },
  { year: "2003", title: "Second Children's Village at Kotebe", desc: "A second Children's Village is established at Kotebe near Hana Mariam Church, funded through agricultural and self-sustaining income.", imageUrl: "/images/history/scv-top-view.jpg" },
  { year: "2014", title: "Daycare Center", desc: "A Daycare Center is established to support early childhood development and assist working mothers in the community.", imageUrl: "/images/history/event-photo.jpg" },
  { year: "2020", title: "Community Outreach Expansion", desc: "Major expansion of community programs including elderly women support, hygiene kit distribution, and women's economic empowerment.", imageUrl: "/images/history/community-event.jpg" },
  { year: "2025", title: "Continuing the Legacy", desc: "Celebrating four decades of transforming lives, with over 255 children in care and thousands of TVET graduates.", imageUrl: "/images/history/graduation-event.jpg" },
];

export default function OurHistoryPage() {
  return (
    <>
      <PageHero
        badge="Our History"
        title="Our History"
        subtitle="Four decades of transforming lives — from a small initiative to one of Ethiopia's leading child welfare organizations."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Our History", href: "/about/our-history" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            {/* Founder Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-brand-orange/20 mb-4 relative">
                <Image src="/images/history/founder-tsehay.jpg" alt="Mrs. Tsehay Roschli" fill className="object-cover" />
              </div>
              <h2 className="text-2xl">Our Founder</h2>
              <p className="mt-2 text-brand-orange font-semibold">Mrs. Tsehay Roschli</p>
              <div className="mt-8 text-neutral-600 leading-relaxed max-w-3xl mx-auto text-left space-y-4">
                <p>
                  Selam Children&apos;s Village was established by Ms. Tsehay Roschli, a visionary and mother of many. It was founded in 1986. At that time, Mrs. Tsehay was living in Switzerland when severe famine and drought struck Ethiopia, especially in the northern part. Many Ethiopians died, and a large number of children lost their parents.
                </p>
                <p>
                  Mrs. Tsehay, who saw this sad news on a TV channel in Switzerland, felt deeply disturbed and thought that she must do something. She brought clothes and money she had collected from her friends and relatives and distributed them to the victims.
                </p>
                <p>
                  However, she was concerned about the magnitude of the problem, especially the future of children who had lost their parents. She returned to Switzerland and consulted her family—Mr. David Roschli and Mrs. Meria Roschli—as well as her siblings. Her family was very willing to support this good deed and guaranteed her that they would be by her side to achieve her vision. Mrs. Tsehay and her family wasted no time and started the fundraising work.
                </p>
                <p>
                  In 1985, Mrs. Tsehay returned to Ethiopia with some money she had raised. She approached the government and asked how they would assist her if she took in and cared for 20 children. The officials promised her a plot of land, tax-free privileges to import materials, and other assistance. With an official letter stating the government&apos;s support, her family and friends continued to raise money for her.
                </p>
                <p>
                  After securing land on the outskirts of Addis Ababa in Kotebe, she wasted no time. In three months, the house was ready to shelter the children. She went to Bati in Wello, where she had witnessed the misery months prior. She had planned for only 20 children, but she picked 28 children who had lost their parents due to the drought and started the journey of Selam Children&apos;s Village.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 md:-translate-x-px" />
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`relative flex items-start gap-6 mb-10 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-brand-orange border-2 border-white shadow-md -translate-x-1.5 md:-translate-x-1.5 mt-2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right flex flex-col items-start md:items-end" : "md:pl-12 flex flex-col items-start"}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-orange text-white text-sm font-bold mb-3">
                      {item.year}
                    </span>
                    
                    {item.imageUrl && (
                      <div className="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden shadow-md mb-4 bg-neutral-100 border border-neutral-100 group">
                        <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    
                    <h3 className="text-lg font-bold text-brand-dark tracking-normal">{item.title}</h3>
                    <p className={`mt-2 text-neutral-600 leading-relaxed ${i % 2 === 0 ? "md:text-right" : "text-left"}`}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
