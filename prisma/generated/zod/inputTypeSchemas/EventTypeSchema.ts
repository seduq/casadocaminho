import { z } from 'zod';

export const EventTypeSchema = z.enum(['Sopa','Leite','Cesta_De_Alimentos','Enxoval','Cobertores']);

export type EventTypeType = `${z.infer<typeof EventTypeSchema>}`

export default EventTypeSchema;
