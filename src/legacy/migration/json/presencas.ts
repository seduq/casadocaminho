/* eslint-disable @typescript-eslint/no-unused-vars */
import frequenciasRaw from '@/legacy/database/json/FrequenciaFamilias.json'
import type { Dependente } from './dependentes';
import { eventos, type Evento } from './eventos';
import { familias, type Familia } from './familias';
import { eventosType } from './utils';

import dayjs, { Dayjs } from 'dayjs';


// Cálculo de idade (ambas família e dep) é feita em ações
// Calculo é feito no cadastro da frequencia da idade e restrições
// Isso é importante para a cesta
type FrequenciaRaw = typeof frequenciasRaw[number];

type Presenca = {
  Familia: Familia;
  Evento: Evento;
  Dependentes: Dependente[]
  Presente: string;
  Meninas: string;
  Meninos: string;
  CreatedAt: Dayjs;
}

const diasInicio = 0;
const diasFim = 10;

function mapping(raw: FrequenciaRaw): Presenca[] {
  const created = dayjs(raw['Creation Date']);

  const _eventos = eventos.filter(e =>
  (e.DataInicio.subtract(diasInicio, 'd').unix() < created.unix() &&
    created.unix() < e.DataFinal.add(diasFim, 'd').unix())
  ).filter(e => e.TipoEvento == raw.Tipo_evento);

  const _familia = familias.find(f => f.Codigo == raw.Codigo_familia);
  if (!_familia) {
    throw new Error()
  }

  const processed: Presenca[] = _eventos.map(e => ({
    Presente: raw.Presente,
    Meninas: raw.Quantidade_meninas,
    Meninos: raw.Quantidade_meninos,
    Familia: _familia,
    Evento: e,
    Dependentes: _familia.Dependentes,
    CreatedAt: dayjs(raw['Creation Date'])
  }))

  return processed;
}

const frequenciasOrdernadaPorCreate = frequenciasRaw.sort((a, b) =>
  Date.parse(a['Creation Date']) - Date.parse(b['Creation Date']));

const frequenciasOrdernadaPorFamilia = frequenciasRaw.sort((a, b) =>
  parseInt(a.Codigo_familia) - parseInt(b.Codigo_familia));

const presencas = frequenciasRaw.flatMap(mapping)

export { presencas };
export type { Presenca, FrequenciaRaw };
