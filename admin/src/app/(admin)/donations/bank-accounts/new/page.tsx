import { BankAccountForm } from "../BankAccountForm";
import { createBankAccount } from "@/actions/bank-accounts";

export default function NewBankAccountPage() {
  return <BankAccountForm action={createBankAccount} />;
}
