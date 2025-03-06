import dayjs, { Dayjs } from 'dayjs';
import familiasRaw from '@/legacy/database/json/Familias.json'
import { type Dependente } from './dependentes';
import { eventos, type Evento } from './eventos';
import { genero, Parentesco, parentesco, type GeneroType } from './utils';

type FamiliaRaw = typeof familiasRaw[number];

type Familia = {
  Codigo: string;
  Titular_Nome: string;
  Titular_RG: string;
  Titular_CPF: string;
  Assistido: boolean;
  Titular_DataNascimento: Dayjs;
  _Dependentes: string
  Dependentes: Dependente[];
  Eventos: Evento[];
  Titular_Genero: GeneroType | string;
  Titular_Telefone: string;
  CreatedAt: Date;
}

function mapping(raw: FamiliaRaw): Familia {
  const _eventos = raw.Eventos
    .split(",")
    .flat()
    .map(d => d.trim().toLocaleUpperCase())
  const familiaEventos = eventos.filter(e => _eventos.includes(e.Descricao));


  const processed: Familia = {
    Codigo: raw.Codigo,
    Titular_Nome: raw.Nome_titular.trim().toLocaleUpperCase(),
    Titular_Genero: genero(raw.Sexo),
    Titular_CPF: process.env.prod ? raw.CPF : "#".repeat(11),
    Titular_RG: process.env.prod ? raw.RG :
      "#".repeat(9),
    Titular_Telefone: process.env.prod ? raw.Telefone :
      "#".repeat(11),
    Titular_DataNascimento: process.env.prod ?
      dayjs(raw.data_nascimento_titula) :
      dayjs(),
    Assistido: raw.Assistido == "sim" ? true : false,
    _Dependentes: raw.Dependentes,
    Dependentes: [],
    Eventos: familiaEventos,
    CreatedAt: new Date(Date.parse(raw['Creation Date'])),
  }

  const _dependentes = raw.Dependentes
    .split(",")
    .flat()
    .map(d => d.trim().toLocaleUpperCase()).map<Dependente>(d => ({
      Nome: d,
      DataNascimento: dayjs(),
      CreatedAt: dayjs(raw['Creation Date']),
      Familia: processed,
      Parentesco: '',
      Sexo: ''
    }));

  processed.Dependentes.push()
  return processed;
}

// Mapping
const familias = familiasRaw.map(mapping);

// 18 outliers
const familiasSemCodigo = familias.filter(f => f.Codigo == "");

// 1 outlier
const familiasSemTitular = familias.filter((f) => f.Titular_Nome == "");

// Familias nao assistidas (18)
const familiaNaoAssista = familias.filter((f) => f.Assistido == false)

// 1150 Familias com eventos vazios, o resto corresponde a tabela Eventos
const familiasSemEventos = familias.filter(f => f.Eventos.length == 0);
const familiasEventos = new Map();
familias
  .map(f => f.Eventos)
  .flat()
  .forEach(e => familiasEventos.set(e.Descricao, (familiasEventos.get(e.Descricao) || 0) + 1));

export { familias, familiasSemCodigo, familiasSemTitular, familiasEventos, familiaNaoAssista, familiasSemEventos };
export type { FamiliaRaw, Familia };
