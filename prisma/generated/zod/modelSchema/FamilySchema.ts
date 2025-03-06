import { z } from 'zod';
import { DependentWithRelationsSchema, DependentPartialWithRelationsSchema, DependentOptionalDefaultsWithRelationsSchema } from './DependentSchema'
import type { DependentWithRelations, DependentPartialWithRelations, DependentOptionalDefaultsWithRelations } from './DependentSchema'
import { AttendanceWithRelationsSchema, AttendancePartialWithRelationsSchema, AttendanceOptionalDefaultsWithRelationsSchema } from './AttendanceSchema'
import type { AttendanceWithRelations, AttendancePartialWithRelations, AttendanceOptionalDefaultsWithRelations } from './AttendanceSchema'

/////////////////////////////////////////
// FAMILY SCHEMA
/////////////////////////////////////////

export const FamilySchema = z.object({
  Id: z.number().int(),
  Code: z.string(),
  Name: z.string(),
  Birthday: z.coerce.date(),
  CreatedAt: z.coerce.date(),
  UpdatedAt: z.coerce.date(),
})

export type Family = z.infer<typeof FamilySchema>

/////////////////////////////////////////
// FAMILY PARTIAL SCHEMA
/////////////////////////////////////////

export const FamilyPartialSchema = FamilySchema.partial()

export type FamilyPartial = z.infer<typeof FamilyPartialSchema>

/////////////////////////////////////////
// FAMILY OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FamilyOptionalDefaultsSchema = FamilySchema.merge(z.object({
  Id: z.number().int().optional(),
  CreatedAt: z.coerce.date().optional(),
  UpdatedAt: z.coerce.date().optional(),
}))

export type FamilyOptionalDefaults = z.infer<typeof FamilyOptionalDefaultsSchema>

/////////////////////////////////////////
// FAMILY RELATION SCHEMA
/////////////////////////////////////////

export type FamilyRelations = {
  Dependents: DependentWithRelations[];
  Attendance: AttendanceWithRelations[];
};

export type FamilyWithRelations = z.infer<typeof FamilySchema> & FamilyRelations

export const FamilyWithRelationsSchema: z.ZodType<FamilyWithRelations> = FamilySchema.merge(z.object({
  Dependents: z.lazy(() => DependentWithRelationsSchema).array(),
  Attendance: z.lazy(() => AttendanceWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// FAMILY OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type FamilyOptionalDefaultsRelations = {
  Dependents: DependentOptionalDefaultsWithRelations[];
  Attendance: AttendanceOptionalDefaultsWithRelations[];
};

export type FamilyOptionalDefaultsWithRelations = z.infer<typeof FamilyOptionalDefaultsSchema> & FamilyOptionalDefaultsRelations

export const FamilyOptionalDefaultsWithRelationsSchema: z.ZodType<FamilyOptionalDefaultsWithRelations> = FamilyOptionalDefaultsSchema.merge(z.object({
  Dependents: z.lazy(() => DependentOptionalDefaultsWithRelationsSchema).array(),
  Attendance: z.lazy(() => AttendanceOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// FAMILY PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type FamilyPartialRelations = {
  Dependents?: DependentPartialWithRelations[];
  Attendance?: AttendancePartialWithRelations[];
};

export type FamilyPartialWithRelations = z.infer<typeof FamilyPartialSchema> & FamilyPartialRelations

export const FamilyPartialWithRelationsSchema: z.ZodType<FamilyPartialWithRelations> = FamilyPartialSchema.merge(z.object({
  Dependents: z.lazy(() => DependentPartialWithRelationsSchema).array(),
  Attendance: z.lazy(() => AttendancePartialWithRelationsSchema).array(),
})).partial()

export type FamilyOptionalDefaultsWithPartialRelations = z.infer<typeof FamilyOptionalDefaultsSchema> & FamilyPartialRelations

export const FamilyOptionalDefaultsWithPartialRelationsSchema: z.ZodType<FamilyOptionalDefaultsWithPartialRelations> = FamilyOptionalDefaultsSchema.merge(z.object({
  Dependents: z.lazy(() => DependentPartialWithRelationsSchema).array(),
  Attendance: z.lazy(() => AttendancePartialWithRelationsSchema).array(),
}).partial())

export type FamilyWithPartialRelations = z.infer<typeof FamilySchema> & FamilyPartialRelations

export const FamilyWithPartialRelationsSchema: z.ZodType<FamilyWithPartialRelations> = FamilySchema.merge(z.object({
  Dependents: z.lazy(() => DependentPartialWithRelationsSchema).array(),
  Attendance: z.lazy(() => AttendancePartialWithRelationsSchema).array(),
}).partial())

export default FamilySchema;
