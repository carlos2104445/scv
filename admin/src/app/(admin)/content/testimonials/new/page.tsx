import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "@/actions/testimonials";

export default function NewTestimonialPage() {
  return <TestimonialForm action={createTestimonial} />;
}
