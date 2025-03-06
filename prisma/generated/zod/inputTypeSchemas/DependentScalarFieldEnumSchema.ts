import { z } from 'zod';

export const DependentScalarFieldEnumSchema = z.enum(['Id','Code','Name','Birthday','FamilyRelationship','Gender','FamilyId','CreatedAt','UpdatedAt']);

export default DependentScalarFieldEnumSchema;
