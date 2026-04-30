import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EventForm } from "../EventForm";
import { updateEvent, deleteEvent } from "@/actions/events";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }>; }

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <EventForm
      initialData={event}
      action={updateEvent.bind(null, id)}
      deleteAction={deleteEvent}
    />
  );
}
