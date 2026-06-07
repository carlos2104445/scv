import { UserForm } from "../UserForm";
import { createUser } from "@/actions/users";

export default function NewUserPage() {
  return <UserForm action={createUser} />;
}
