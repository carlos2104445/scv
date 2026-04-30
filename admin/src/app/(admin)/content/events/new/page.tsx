import { EventForm } from "../EventForm";
import { createEvent } from "@/actions/events";

export default function NewEventPage() {
  return <EventForm action={createEvent} />;
}
