import { DepartmentForm } from "../DepartmentForm";
import { createDepartment } from "@/actions/departments";

export default function NewDepartmentPage() {
  return <DepartmentForm action={createDepartment} />;
}
