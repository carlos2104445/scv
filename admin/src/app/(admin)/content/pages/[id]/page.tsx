import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PageForm } from "../PageForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const page = await prisma.page.findUnique({ where: { id } });

  if (!page) return notFound();

  async function updatePage(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const body = formData.get("body") as string;
    const heroImage = formData.get("heroImage") as string || null;
    const seoTitle = formData.get("seoTitle") as string || null;
    const seoDesc = formData.get("seoDesc") as string || null;
    const seoImage = formData.get("seoImage") as string || null;
    const status = (formData.get("status") as string) || "DRAFT";

    await prisma.page.update({
      where: { id },
      data: { title, slug, body, heroImage, seoTitle, seoDesc, seoImage, status: status as any }
    });

    revalidatePath("/content/pages");
    redirect("/content/pages");
  }

  async function deletePage(id: string) {
    "use server";
    await prisma.page.delete({ where: { id } });
    revalidatePath("/content/pages");
    redirect("/content/pages");
  }

  return <PageForm initialData={page} action={updatePage} deleteAction={deletePage} />;
}
