import { z } from 'zod';

export const FamilyScalarFieldEnumSchema = z.enum(['Id','Code','Name','Birthday','CreatedAt','UpdatedAt']);

export default FamilyScalarFieldEnumSchema;
