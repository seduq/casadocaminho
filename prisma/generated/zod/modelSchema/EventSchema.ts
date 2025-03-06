import { z } from 'zod';
import { EventTypeSchema } from '../inputTypeSchemas/EventTypeSchema'

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  EventType: EventTypeSchema,
  Id: z.number().int(),
  DataFinal: z.coerce.date(),
  DataInicio: z.coerce.date(),
  Descricao: z.string(),
  CreatedAt: z.coerce.date(),
  UpdatedAt: z.coerce.date(),
})

export type Event = z.infer<typeof EventSchema>

/////////////////////////////////////////
// EVENT PARTIAL SCHEMA
/////////////////////////////////////////

export const EventPartialSchema = EventSchema.partial()

export type EventPartial = z.infer<typeof EventPartialSchema>

/////////////////////////////////////////
// EVENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const EventOptionalDefaultsSchema = EventSchema.merge(z.object({
  Id: z.number().int().optional(),
  CreatedAt: z.coerce.date().optional(),
  UpdatedAt: z.coerce.date().optional(),
}))

export type EventOptionalDefaults = z.infer<typeof EventOptionalDefaultsSchema>

export default EventSchema;
