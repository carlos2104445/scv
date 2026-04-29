"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, CreditCard, Building2, ExternalLink, Copy, Check, Landmark } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const bankAccounts = [
  { bank: "Cooperative Bank of Oromia", abbr: "COOP", accountName: "Selam Children's Village", accountNumber: "1234567890", branch: "Kotebe Branch", currency: "ETB" },
  { bank: "Bank of Abyssinia", abbr: "BOA", accountName: "Selam Children's Village", accountNumber: "0987654321", branch: "Main Branch", currency: "ETB" },
  { bank: "Commercial Bank of Ethiopia", abbr: "CBE", accountName: "Selam Children's Village", accountNumber: "1000234567890", branch: "Kotebe Branch", currency: "ETB/USD" },
  { bank: "Tele Birr", abbr: "TB", accountName: "Selam Children's Village", accountNumber: "0911234567", branch: "Mobile Money", currency: "ETB" },
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
  const [tab, setTab] = useState<"online" | "offline">("online");

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
          <div className="max-w-4xl mx-auto">
            {/* Hero message */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2>Invest in Children, Harvest a Generation</h2>
              <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
                For four decades, your support has helped us provide care, education, and hope to hundreds of children. Choose your preferred donation method below.
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-10">
              <button
                onClick={() => setTab("online")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${tab === "online" ? "bg-brand-orange text-white shadow-lg" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
              >
                <CreditCard className="w-5 h-5" /> Online Payment
              </button>
              <button
                onClick={() => setTab("offline")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${tab === "offline" ? "bg-brand-orange text-white shadow-lg" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}
              >
                <Building2 className="w-5 h-5" /> Bank Transfer
              </button>
            </div>

            {/* Online Tab */}
            {tab === "online" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chapa ETB */}
                  <a
                    href="https://chapa.link/donation/view/DN-7e5lUodNN6lL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card-base hover-lift p-8 text-center"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-lg">ETB</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark tracking-normal">Donate in ETB</h3>
                    <p className="mt-2 text-sm text-neutral-600">Ethiopian Birr via Chapa</p>
                    <div className="mt-4 btn-primary mx-auto">
                      <Heart className="w-4 h-4" /> Donate Now <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>

                  {/* Chapa USD */}
                  <a
                    href="https://chapa.link/donation/view/DN-SIQR7rmPsCxL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group card-base hover-lift p-8 text-center"
                  >
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-lg">USD</span>
                    </div>
                    <h3 className="text-xl font-bold text-brand-dark tracking-normal">Donate in USD</h3>
                    <p className="mt-2 text-sm text-neutral-600">US Dollar via Chapa</p>
                    <div className="mt-4 btn-primary mx-auto">
                      <Heart className="w-4 h-4" /> Donate Now <ExternalLink className="w-3 h-3" />
                    </div>
                  </a>
                </div>

                {/* GoFundMe */}
                <a
                  href="https://www.gofundme.com/f/together-we-can-help-most-vulnerable-children"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block card-base hover-lift p-8 text-center bg-gradient-to-br from-emerald-50 to-white"
                >
                  <h3 className="text-xl font-bold text-brand-dark tracking-normal">GoFundMe Campaign</h3>
                  <p className="mt-2 text-neutral-600">Together We Can Help Most Vulnerable Children</p>
                  <div className="mt-4 inline-flex items-center gap-2 btn-secondary">
                    Donate via GoFundMe <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              </motion.div>
            )}

            {/* Offline Tab */}
            {tab === "offline" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
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
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
