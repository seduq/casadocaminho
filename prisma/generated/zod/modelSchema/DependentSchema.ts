import { z } from 'zod';
import { FamilyRelationshipSchema } from '../inputTypeSchemas/FamilyRelationshipSchema'
import { GenderSchema } from '../inputTypeSchemas/GenderSchema'
import { FamilyWithRelationsSchema, FamilyPartialWithRelationsSchema, FamilyOptionalDefaultsWithRelationsSchema } from './FamilySchema'
import type { FamilyWithRelations, FamilyPartialWithRelations, FamilyOptionalDefaultsWithRelations } from './FamilySchema'
import { AttendanceWithRelationsSchema, AttendancePartialWithRelationsSchema, AttendanceOptionalDefaultsWithRelationsSchema } from './AttendanceSchema'
import type { AttendanceWithRelations, AttendancePartialWithRelations, AttendanceOptionalDefaultsWithRelations } from './AttendanceSchema'

/////////////////////////////////////////
// DEPENDENT SCHEMA
/////////////////////////////////////////

export const DependentSchema = z.object({
  FamilyRelationship: FamilyRelationshipSchema,
  Gender: GenderSchema,
  Id: z.number().int(),
  Code: z.string(),
  Name: z.string(),
  Birthday: z.coerce.date(),
  FamilyId: z.number().int(),
  CreatedAt: z.coerce.date(),
  UpdatedAt: z.coerce.date(),
})

export type Dependent = z.infer<typeof DependentSchema>

/////////////////////////////////////////
// DEPENDENT PARTIAL SCHEMA
/////////////////////////////////////////

export const DependentPartialSchema = DependentSchema.partial()

export type DependentPartial = z.infer<typeof DependentPartialSchema>

/////////////////////////////////////////
// DEPENDENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DependentOptionalDefaultsSchema = DependentSchema.merge(z.object({
  Id: z.number().int().optional(),
  CreatedAt: z.coerce.date().optional(),
  UpdatedAt: z.coerce.date().optional(),
}))

export type DependentOptionalDefaults = z.infer<typeof DependentOptionalDefaultsSchema>

/////////////////////////////////////////
// DEPENDENT RELATION SCHEMA
/////////////////////////////////////////

export type DependentRelations = {
  Family: FamilyWithRelations;
  Attendances: AttendanceWithRelations[];
};

export type DependentWithRelations = z.infer<typeof DependentSchema> & DependentRelations

export const DependentWithRelationsSchema: z.ZodType<DependentWithRelations> = DependentSchema.merge(z.object({
  Family: z.lazy(() => FamilyWithRelationsSchema),
  Attendances: z.lazy(() => AttendanceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DEPENDENT OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type DependentOptionalDefaultsRelations = {
  Family: FamilyOptionalDefaultsWithRelations;
  Attendances: AttendanceOptionalDefaultsWithRelations[];
};

export type DependentOptionalDefaultsWithRelations = z.infer<typeof DependentOptionalDefaultsSchema> & DependentOptionalDefaultsRelations

export const DependentOptionalDefaultsWithRelationsSchema: z.ZodType<DependentOptionalDefaultsWithRelations> = DependentOptionalDefaultsSchema.merge(z.object({
  Family: z.lazy(() => FamilyOptionalDefaultsWithRelationsSchema),
  Attendances: z.lazy(() => AttendanceOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// DEPENDENT PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type DependentPartialRelations = {
  Family?: FamilyPartialWithRelations;
  Attendances?: AttendancePartialWithRelations[];
};

export type DependentPartialWithRelations = z.infer<typeof DependentPartialSchema> & DependentPartialRelations

export const DependentPartialWithRelationsSchema: z.ZodType<DependentPartialWithRelations> = DependentPartialSchema.merge(z.object({
  Family: z.lazy(() => FamilyPartialWithRelationsSchema),
  Attendances: z.lazy(() => AttendancePartialWithRelationsSchema).array(),
})).partial()

export type DependentOptionalDefaultsWithPartialRelations = z.infer<typeof DependentOptionalDefaultsSchema> & DependentPartialRelations

export const DependentOptionalDefaultsWithPartialRelationsSchema: z.ZodType<DependentOptionalDefaultsWithPartialRelations> = DependentOptionalDefaultsSchema.merge(z.object({
  Family: z.lazy(() => FamilyPartialWithRelationsSchema),
  Attendances: z.lazy(() => AttendancePartialWithRelationsSchema).array(),
}).partial())

export type DependentWithPartialRelations = z.infer<typeof DependentSchema> & DependentPartialRelations

export const DependentWithPartialRelationsSchema: z.ZodType<DependentWithPartialRelations> = DependentSchema.merge(z.object({
  Family: z.lazy(() => FamilyPartialWithRelationsSchema),
  Attendances: z.lazy(() => AttendancePartialWithRelationsSchema).array(),
}).partial())

export default DependentSchema;
