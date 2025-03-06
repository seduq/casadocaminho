import dayjs, { Dayjs } from 'dayjs';
import dependentesRaw from '@/legacy/database/json/Dependentes.json'
import { familias, type Familia } from './familias';
import { genero, parentesco, type GeneroType, type ParentescoType } from './utils';


type DependenteRaw = typeof dependentesRaw[number];
type Dependente = {
  DataNascimento: Dayjs;
  Familia: Familia | null;
  Nome: string;
  Parentesco: ParentescoType | string;
  Sexo: GeneroType | string;
  CreatedAt: Dayjs;
}

// Dependentes e familias nao atrelados em si (35)
const familiasNaoAtreladas: { familia: Familia | null, dependente: DependenteRaw }[] = []

function mapping(raw: DependenteRaw): Dependente | null {
  const nome = raw.Nome.trim().toLocaleUpperCase();
  const familia = familias.filter(f => raw.familia == `${f.Codigo} - ${f.Titular_Nome}`).pop() || null;

  // Se o dependente está na lista de depedentes dentro da familia
  const familiaAtrelada = familia?._Dependentes?.includes(nome);
  if (!familiaAtrelada) {
    familiasNaoAtreladas.push({ familia: familia, dependente: raw })
    return null;
  }

  const processed: Dependente = {
    Nome: nome,
    Familia: familia,
    Parentesco: parentesco(raw.Parentesco),
    Sexo: genero(raw.Sexo),
    DataNascimento: process.env.NODE_ENV == "production" ?
      dayjs(raw.data_nascimento) :
      dayjs(),
    CreatedAt: dayjs(raw['Creation Date'])
  }
  // Atribui o link de familia para dependentes
  familia?.Dependentes.push(processed);

  return processed;
}

const dependentes = dependentesRaw.map(mapping).filter(d => d != null);

// Lista de dependentes sem parentesco (15)
const dependentesSemParentesco = dependentes.filter(d => d.Parentesco == "");

export type { Dependente, DependenteRaw }
export { dependentes, dependentesSemParentesco }