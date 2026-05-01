import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PageForm } from "../PageForm";

export default function NewPage() {
  async function createPage(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const body = formData.get("body") as string;
    const heroImage = formData.get("heroImage") as string || null;
    const seoTitle = formData.get("seoTitle") as string || null;
    const seoDesc = formData.get("seoDesc") as string || null;
    const seoImage = formData.get("seoImage") as string || null;
    const status = (formData.get("status") as string) || "DRAFT";

    await prisma.page.create({
      data: {
        title, slug, body, heroImage, seoTitle, seoDesc, seoImage,
        status: status as any
      }
    });

    revalidatePath("/content/pages");
    redirect("/content/pages");
  }

  return <PageForm action={createPage} />;
}
