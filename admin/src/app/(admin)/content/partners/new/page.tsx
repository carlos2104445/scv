import { PartnerForm } from "../PartnerForm";
import { createPartner } from "@/actions/partners";

export default function NewPartnerPage() {
  return <PartnerForm action={createPartner} />;
}
