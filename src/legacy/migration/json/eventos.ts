import dayjs, { Dayjs } from 'dayjs';
import eventosRaw from '@/legacy/database/json/Eventos.json'
import familiasRaw from '@/legacy/database/json/Familias.json'
import { diffArray, diffTuple, TipoEvento, type TipoEventoType } from './utils';

type EventoRaw = typeof eventosRaw[number];
type Evento = {
  DataFinal: Dayjs;
  DataInicio: Dayjs;
  Descricao: string;
  TipoEvento: TipoEventoType | string;
  CreatedAt: Dayjs;
}

const eventosFamilias = familiasRaw.flatMap(
  raw => raw.Eventos
    .split(",")
    .flat()
    .map(d => d.trim().toLocaleUpperCase()
    ));

const eventosNome = eventosRaw
  .map(e => e.Descricao)
  .map(e => e.trim().toUpperCase());

const eventosArray = diffArray(eventosNome, eventosFamilias,
  (a: string, b: string) => a.localeCompare(b))
const eventoList = Array.from(new Set(eventosArray));

// 11 ="CB-FICHASNOVAS - SET"
// 12 ="CB-GESTANTES - AGOS"
// 17 ="CB-INFORMÁTICA AGOS"
// 19 ="CB-PSPEDAGOGIA SET"


// Consta só cesta básica
const eventoType = Array.from(
  new Set(
    eventosRaw.map(e => e.Tipo_evento
    )
  ));


function mapping(raw: EventoRaw) {
  // Tipo de evento não está na lista (0)
  const descricao = raw.Descricao.trim().toUpperCase();
  const includedEventType = eventoType.includes(raw.Tipo_evento.trim().toUpperCase())

  const processed: Evento = {
    DataFinal: dayjs(raw.data_fim),
    DataInicio: dayjs(raw.data_inicio),
    Descricao: descricao,
    TipoEvento: raw.Tipo_evento as TipoEventoType,
    CreatedAt: dayjs(raw['Creation Date']),
  }
  return processed;
}

const eventos = eventosRaw.map(mapping);

// Nenhum evento sem familias, sem descricao, sem datas (0)
const eventosSemFamilias = eventosRaw.filter(e => e.Familias == "");
const eventosSemDescricao = eventosRaw.filter(e => e.Descricao == "");
const eventosSemInicioFim = eventosRaw.filter(e => e.data_inicio == "" || e.data_fim == "");

// Eventos em 2024
const eventosMap = new Map();
eventos.forEach(e => eventosMap.set(e.TipoEvento,
  (eventosMap.get(e.TipoEvento) || 0) + 1));

// Sopa = 8
// Leite = 12
// Cesta de Alimentos = 18
// Enxoval = 11
// Cobertores =  1
// "" => 2
const eventosSemTipo = eventosRaw.filter(e => e.Tipo_evento == "");


// Todos os eventos foram criados em 2024, porém a frequencia data (52)
const sorted = eventos.sort((a, b) => a.DataInicio.unix() - b.DataInicio.unix())

const eventosTuple = diffTuple(eventosNome, eventosFamilias,
  (a: string, b: string) => a.localeCompare(b))

// Compara para ver quais eventos não batem (0)
const noMatchEvents = eventosFamilias.filter((v) => !eventoList.includes(v) && !(v == ""));

export type { Evento, EventoRaw };
export { eventos, eventoList, eventoType, eventosFamilias }
export {
  eventosSemFamilias,
  eventosSemDescricao,
  eventosSemInicioFim
}