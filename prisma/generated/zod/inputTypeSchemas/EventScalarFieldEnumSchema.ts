import { z } from 'zod';

export const EventScalarFieldEnumSchema = z.enum(['Id','DataFinal','DataInicio','Descricao','EventType','CreatedAt','UpdatedAt']);

export default EventScalarFieldEnumSchema;
