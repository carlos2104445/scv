import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { BankAccountForm } from "../BankAccountForm";
import { updateBankAccount, deleteBankAccount } from "@/actions/bank-accounts";

export const dynamic = "force-dynamic";
interface Props { params: Promise<{ id: string }>; }

export default async function EditBankAccountPage({ params }: Props) {
  const { id } = await params;
  const account = await prisma.bankAccount.findUnique({ where: { id } });
  if (!account) notFound();
  return <BankAccountForm initialData={account} action={updateBankAccount.bind(null, id)} deleteAction={deleteBankAccount} />;
}
