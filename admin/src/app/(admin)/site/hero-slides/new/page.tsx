import { HeroSlideForm } from "../HeroSlideForm";
import { createHeroSlide } from "@/actions/hero-slides";

export default function NewHeroSlidePage() {
  return <HeroSlideForm action={createHeroSlide} />;
}
