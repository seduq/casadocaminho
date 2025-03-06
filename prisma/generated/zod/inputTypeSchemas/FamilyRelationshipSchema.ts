import { z } from 'zod';

export const FamilyRelationshipSchema = z.enum(['Companheiro','Filho','Neto','Outros']);

export type FamilyRelationshipType = `${z.infer<typeof FamilyRelationshipSchema>}`

export default FamilyRelationshipSchema;
