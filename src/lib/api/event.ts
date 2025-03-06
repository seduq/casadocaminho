"use server"
import { db } from "../db/prisma"
import { EventOptionalDefaultsSchema, EventOptionalDefaults, Event, EventPartial, EventPartialSchema } from "@/zod-types/EventSchema"

export async function createEvent(event: EventOptionalDefaults) {
  const _event = EventOptionalDefaultsSchema.parse(event);
  const result = await db.event.create({
    data: _event
  })

  return result;
}

export async function selectEvent(event: EventPartial) {
  const _event = EventPartialSchema.parse(event);
  const result = await db.event.findFirst({
    where: _event
  })

  return result;
}

export async function selectEvents(event: EventPartial) {
  const _event = EventPartialSchema.parse(event);
  const result = await db.event.findMany({
    where: _event
  })

  return result;
}

export async function upsertEvent(event: EventPartial) {
  const _event = EventPartialSchema.parse(event);
  const _eventCreate = EventOptionalDefaultsSchema.parse(event);
  const result = await db.event.upsert({
    create: _eventCreate,
    update: _event,
    where: {
      Id: _event.Id
    }
  })

  return result;
}

export async function updateEvent(event: Event) {
  const _event = EventPartialSchema.parse(event);
  const result = await db.event.update({
    data: _event,
    where: {
      Id: _event.Id
    }
  })

  return result;
}

export async function deleteEvent(event: EventOptionalDefaults) {
  const _event = EventPartialSchema.required({ Id: true }).parse(event)
  const result = db.event.delete({
    where: _event
  })

  return result
}