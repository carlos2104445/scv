"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

interface BankAccountFormProps {
  initialData?: { id: string; bankName: string; branch: string | null; accountName: string; accountNumber: string; currency: string; swiftCode: string | null; instructions: string | null; logo: string | null; order: number; isPublic: boolean; };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function BankAccountForm({ initialData, action, deleteAction }: BankAccountFormProps) {
  const isEdit = !!initialData;
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/donations/bank-accounts" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Bank Account" : "Add Bank Account"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this account?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" className="btn-primary text-sm py-2"><Save className="w-4 h-4" /> Save</button>
        </div>
      </div>
      <div className="card p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Bank Name</label><input name="bankName" defaultValue={initialData?.bankName || ""} className="input-field font-semibold" required /></div>
          <div><label className="label">Branch</label><input name="branch" defaultValue={initialData?.branch || ""} className="input-field" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Account Name</label><input name="accountName" defaultValue={initialData?.accountName || ""} className="input-field" required /></div>
          <div><label className="label">Account Number</label><input name="accountNumber" defaultValue={initialData?.accountNumber || ""} className="input-field" required /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Currency</label>
            <select name="currency" defaultValue={initialData?.currency || "ETB"} className="input-field">
              <option value="ETB">ETB (Ethiopian Birr)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
              <option value="GBP">GBP (British Pound)</option>
              <option value="CHF">CHF (Swiss Franc)</option>
            </select>
          </div>
          <div><label className="label">SWIFT Code</label><input name="swiftCode" defaultValue={initialData?.swiftCode || ""} className="input-field" /></div>
        </div>
        <div><label className="label">Bank Logo URL</label><input name="logo" defaultValue={initialData?.logo || ""} className="input-field" placeholder="https://..." /></div>
        <div><label className="label">Instructions</label><textarea name="instructions" defaultValue={initialData?.instructions || ""} rows={3} className="input-field resize-y" placeholder="Special transfer instructions..." /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Order</label><input type="number" name="order" defaultValue={initialData?.order || 0} className="input-field" /></div>
          <div className="flex items-center gap-2 pt-7">
            <input type="checkbox" name="isPublic" id="isPublic" defaultChecked={initialData?.isPublic !== false} className="w-4 h-4 rounded border-border" />
            <label htmlFor="isPublic" className="text-sm font-medium">Show on public site</label>
          </div>
        </div>
      </div>
    </form>
  );
}
