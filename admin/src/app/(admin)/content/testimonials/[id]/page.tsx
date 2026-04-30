import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TestimonialForm } from "../TestimonialForm";
import { updateTestimonial, deleteTestimonial } from "@/actions/testimonials";

export const dynamic = "force-dynamic";
interface Props { params: Promise<{ id: string }>; }

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) notFound();
  return <TestimonialForm initialData={item} action={updateTestimonial.bind(null, id)} deleteAction={deleteTestimonial} />;
}
