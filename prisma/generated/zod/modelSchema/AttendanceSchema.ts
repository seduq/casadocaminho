import { z } from 'zod';
import { DependentWithRelationsSchema, DependentPartialWithRelationsSchema, DependentOptionalDefaultsWithRelationsSchema } from './DependentSchema'
import type { DependentWithRelations, DependentPartialWithRelations, DependentOptionalDefaultsWithRelations } from './DependentSchema'
import { FamilyWithRelationsSchema, FamilyPartialWithRelationsSchema, FamilyOptionalDefaultsWithRelationsSchema } from './FamilySchema'
import type { FamilyWithRelations, FamilyPartialWithRelations, FamilyOptionalDefaultsWithRelations } from './FamilySchema'

/////////////////////////////////////////
// ATTENDANCE SCHEMA
/////////////////////////////////////////

export const AttendanceSchema = z.object({
  Id: z.number().int(),
  Boys: z.number().int().nullable(),
  Girls: z.number().int().nullable(),
  CreatedAt: z.coerce.date(),
  UpdatedAt: z.coerce.date(),
})

export type Attendance = z.infer<typeof AttendanceSchema>

/////////////////////////////////////////
// ATTENDANCE PARTIAL SCHEMA
/////////////////////////////////////////

export const AttendancePartialSchema = AttendanceSchema.partial()

export type AttendancePartial = z.infer<typeof AttendancePartialSchema>

/////////////////////////////////////////
// ATTENDANCE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const AttendanceOptionalDefaultsSchema = AttendanceSchema.merge(z.object({
  Id: z.number().int().optional(),
  CreatedAt: z.coerce.date().optional(),
  UpdatedAt: z.coerce.date().optional(),
}))

export type AttendanceOptionalDefaults = z.infer<typeof AttendanceOptionalDefaultsSchema>

/////////////////////////////////////////
// ATTENDANCE RELATION SCHEMA
/////////////////////////////////////////

export type AttendanceRelations = {
  Dependent: DependentWithRelations[];
  Family: FamilyWithRelations[];
};

export type AttendanceWithRelations = z.infer<typeof AttendanceSchema> & AttendanceRelations

export const AttendanceWithRelationsSchema: z.ZodType<AttendanceWithRelations> = AttendanceSchema.merge(z.object({
  Dependent: z.lazy(() => DependentWithRelationsSchema).array(),
  Family: z.lazy(() => FamilyWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ATTENDANCE OPTIONAL DEFAULTS RELATION SCHEMA
/////////////////////////////////////////

export type AttendanceOptionalDefaultsRelations = {
  Dependent: DependentOptionalDefaultsWithRelations[];
  Family: FamilyOptionalDefaultsWithRelations[];
};

export type AttendanceOptionalDefaultsWithRelations = z.infer<typeof AttendanceOptionalDefaultsSchema> & AttendanceOptionalDefaultsRelations

export const AttendanceOptionalDefaultsWithRelationsSchema: z.ZodType<AttendanceOptionalDefaultsWithRelations> = AttendanceOptionalDefaultsSchema.merge(z.object({
  Dependent: z.lazy(() => DependentOptionalDefaultsWithRelationsSchema).array(),
  Family: z.lazy(() => FamilyOptionalDefaultsWithRelationsSchema).array(),
}))

/////////////////////////////////////////
// ATTENDANCE PARTIAL RELATION SCHEMA
/////////////////////////////////////////

export type AttendancePartialRelations = {
  Dependent?: DependentPartialWithRelations[];
  Family?: FamilyPartialWithRelations[];
};

export type AttendancePartialWithRelations = z.infer<typeof AttendancePartialSchema> & AttendancePartialRelations

export const AttendancePartialWithRelationsSchema: z.ZodType<AttendancePartialWithRelations> = AttendancePartialSchema.merge(z.object({
  Dependent: z.lazy(() => DependentPartialWithRelationsSchema).array(),
  Family: z.lazy(() => FamilyPartialWithRelationsSchema).array(),
})).partial()

export type AttendanceOptionalDefaultsWithPartialRelations = z.infer<typeof AttendanceOptionalDefaultsSchema> & AttendancePartialRelations

export const AttendanceOptionalDefaultsWithPartialRelationsSchema: z.ZodType<AttendanceOptionalDefaultsWithPartialRelations> = AttendanceOptionalDefaultsSchema.merge(z.object({
  Dependent: z.lazy(() => DependentPartialWithRelationsSchema).array(),
  Family: z.lazy(() => FamilyPartialWithRelationsSchema).array(),
}).partial())

export type AttendanceWithPartialRelations = z.infer<typeof AttendanceSchema> & AttendancePartialRelations

export const AttendanceWithPartialRelationsSchema: z.ZodType<AttendanceWithPartialRelations> = AttendanceSchema.merge(z.object({
  Dependent: z.lazy(() => DependentPartialWithRelationsSchema).array(),
  Family: z.lazy(() => FamilyPartialWithRelationsSchema).array(),
}).partial())

export default AttendanceSchema;
