import { z } from 'zod';

export const GenderSchema = z.enum(['Masculino','Feminino']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export default GenderSchema;
