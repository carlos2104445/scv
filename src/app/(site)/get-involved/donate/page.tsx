"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, CreditCard, Building2, ExternalLink, Copy, Check, Landmark } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

import Image from "next/image";

const bankAccounts = [
  { bank: "Cooperative Bank of Oromia", abbr: "COOP", accountName: "Selam Children's Village", accountNumber: "100000xxxxxx", branch: "Main Branch", currency: "ETB" },
  { bank: "Bank of Abyssinia", abbr: "BOA", accountName: "Selam Children's Village", accountNumber: "100000xxxxxx", branch: "Main Branch", currency: "ETB" },
  { bank: "Commercial Bank of Ethiopia", abbr: "CBE", accountName: "Selam Children's Village", accountNumber: "100000xxxxxx", branch: "Main Branch", currency: "ETB" },
  { bank: "Awash Bank", abbr: "AWB", accountName: "Selam Children's Village", accountNumber: "100000xxxxxx", branch: "Main Branch", currency: "ETB" },
  { bank: "Tele Birr", abbr: "TB", accountName: "Selam Children's Village", accountNumber: "099xxxxxxx", branch: "Mobile Money", currency: "ETB" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-neutral-100 transition-all" aria-label="Copy to clipboard">
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-neutral-400" />}
    </button>
  );
}

export default function DonatePage() {
  return (
    <>
      <PageHero
        title="Donate"
        subtitle="Your generous contribution transforms lives. Every birr makes a difference."
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/how-to-help" },
          { label: "Donate", href: "/get-involved/donate" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Banner Image */}
            <div className="relative w-full aspect-[3/1] md:aspect-[4/1] rounded-2xl overflow-hidden shadow-lg bg-neutral-100">
              {/* Replace the src with the actual uploaded image path when available */}
              <Image src="/images/donate-banner.jpg" alt="Giving is a Blessing" fill className="object-cover" />
            </div>

            {/* Content */}
            <div className="space-y-6 text-neutral-700 leading-relaxed text-[15px] sm:text-base">
              <p>
                Selam Children Village resource mobilization comprises fundraising and leveraging for the continued and increased allocation of resources for safeguarding and protecting most vulnerable children, youth, and community members. SCV execute these predetermined objectives by getting funds from donors abroad and income generated from cost recovery activities performed locally.
              </p>
              <p>
                For SCV, resource mobilization is found crucial to support more destitute children, address vulnerable community and ensure sustainability of the organization by coping up the growing financial needs to perform as per the organization plan.
              </p>
              <p>
                You are invited to take part your role in supporting Selam Children Village resource mobilization activities through different platforms including our bank accounts, tele birr foreign and local accounts. You can also donate to specific projects listed below.
              </p>
              
              <div className="p-6 bg-brand-orange-50 rounded-2xl space-y-4 text-brand-dark/90 leading-relaxed font-medium">
                <p>
                  ሰላም የሕጻናት መንደር ሀብት ማሰባሰብ ስራዎችን በተጠናከረ መልኩ እየሰራ የሚገኝ ሲሆን ይህም ድርጅቱ ላለፉት ዓመታት ለችግር የተጋለጡ ህጻናትን፤ ወጣቶችንና ሌሎች የማህበረሰብ ክፍሎችን ሲደግፍ የቆየበትን የበጎ አድራጎት ስራዎች ለማስቀጠልና ሌሎች ተጨማሪ አገልግሎት ፈላጊዎችን በፕሮግራሞቻችን ለማካተት የሚያስችል ነው፡፡
                </p>
                <p>
                  ስለሆነም የሀብት የማሰባሰብ እንቅስቃሴው ለድርጅቱ አገልግሎት መስፋፋትና መቀጠል ወሳኝ ከመሆኑም በላይ ከጊዜ ወደ ጊዜ እየጨመረ የመጣውን ወጪ ጫና ለመቋቋም አስፈላጊ በመሆኑ ይህ መልዕክት በተለያየ አጋጣሚ ያያችሁ የህብረተሰብ ክፍሎች የበጎ አድራጎት ስራውን በማገዝ አገልግሎቱ የሚያስፈልጋቸው ወገኖችን እንድታግዙ እየጠየቅን ለማገዝ ከታች የተገለጹትን የባንክ ሂሳብ ቁጥሮቻችንን፤ በቴሌ ብር ፤ በፔይፓል እንዲሁም እርስዎ በሚመችዎ መንገድ ያድርሱን፤ ስለሚያደርጉት ልገሳ አገልግሎቱን በሚያገኙ ወገኖች ስም እናመሰግናለን፡፡
                </p>
              </div>
            </div>

            <div className="text-center pt-8 border-t border-neutral-100">
              <h2 className="text-2xl font-bold text-brand-dark mb-2">“Invest on Children Harvest in Generation”</h2>
              <p className="text-lg font-semibold text-brand-orange">Local and International Donations</p>
              <p className="text-neutral-500 mt-2">For offline donation, please use any of the following bank accounts or Tele Birr.</p>
            </div>

            {/* Offline Banks */}
            <div className="space-y-4">
              {bankAccounts.map((account) => (
                <div key={account.abbr} className="card-base p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                        <Landmark className="w-6 h-6 text-brand-orange" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brand-dark tracking-normal">{account.bank}</h3>
                        <p className="text-sm text-neutral-500">{account.branch}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-brand-orange-50 text-brand-orange text-xs font-medium">
                      {account.currency}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                      <div>
                        <p className="text-xs text-neutral-500">Account Name</p>
                        <p className="text-sm font-medium text-brand-dark">{account.accountName}</p>
                      </div>
                      <CopyButton text={account.accountName} />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                      <div>
                        <p className="text-xs text-neutral-500">Account Number</p>
                        <p className="text-sm font-mono font-bold text-brand-dark">{account.accountNumber}</p>
                      </div>
                      <CopyButton text={account.accountNumber} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Online Donations Integration Space */}
            <div className="mt-16 pt-10 border-t border-neutral-200">
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-brand-dark">Online Donations</h3>
                <p className="text-sm text-neutral-500 mt-1">We will integrate Chapa and GoFundMe platforms below.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 pointer-events-none">
                {/* Chapa Placeholder */}
                <div className="group card-base p-8 text-center bg-neutral-50">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">ETB</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark tracking-normal">Donate via Chapa</h3>
                  <p className="mt-2 text-sm text-neutral-600">Coming Soon</p>
                </div>
                {/* GoFundMe Placeholder */}
                <div className="group card-base p-8 text-center bg-neutral-50">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark tracking-normal">GoFundMe Campaign</h3>
                  <p className="mt-2 text-sm text-neutral-600">Coming Soon</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
