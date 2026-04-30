import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, CreditCard } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BankAccountsPage() {
  const accounts = await prisma.bankAccount.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Bank Accounts</h1><p className="text-neutral-500 text-sm mt-1">Manage donation bank accounts displayed on the public site.</p></div>
        <Link href="/donations/bank-accounts/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Account</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((a) => (
          <Link key={a.id} href={`/donations/bank-accounts/${a.id}`} className="card p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0"><CreditCard className="w-5 h-5 text-emerald-600" /></div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm group-hover:text-brand-orange transition-colors">{a.bankName}</p>
                <p className="text-xs text-neutral-500">{a.branch}</p>
                <div className="mt-2 space-y-1 text-xs text-neutral-600">
                  <p><span className="text-neutral-400">Account:</span> {a.accountNumber}</p>
                  <p><span className="text-neutral-400">Name:</span> {a.accountName}</p>
                  <p><span className="text-neutral-400">Currency:</span> {a.currency}</p>
                </div>
              </div>
              {a.isPublic ? <span className="badge-published">public</span> : <span className="badge-draft">hidden</span>}
            </div>
          </Link>
        ))}
        {accounts.length === 0 && <div className="col-span-full card p-12 text-center text-neutral-400 text-sm">No bank accounts yet</div>}
      </div>
    </div>
  );
}
