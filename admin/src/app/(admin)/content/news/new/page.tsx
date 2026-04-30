import { NewsForm } from "../NewsForm";
import { createNews } from "@/actions/news";

export default function NewNewsPage() {
  return (
    <NewsForm action={createNews} />
  );
}
