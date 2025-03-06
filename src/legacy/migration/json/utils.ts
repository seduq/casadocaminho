import familiasRaw from '@/legacy/database/json/Familias.json'
import dependentesRaw from '@/legacy/database/json/Dependentes.json'
import eventosRaw from '@/legacy/database/json/Eventos.json';

export enum Parentesco {
  "Neto",
  "Outros",
  "Filho",
  "Companheiro"
}
export type ParentescoType = keyof typeof Parentesco;

export enum Genero {
  "Masculino",
  "Feminino"
}
export type GeneroType = keyof typeof Genero;

export enum TipoEvento {
  "Sopa",
  "Leite",
  "Cesta de Alimentos",
  "Enxoval",
  "Cobertores"
}
export type TipoEventoType = keyof typeof TipoEvento;

const generos = Array.from(new Set([
  ...familiasRaw.map(f => f.Sexo),
  ...dependentesRaw.map(d => d.Sexo)]));
export const genero = (g: string): GeneroType | string =>
  generos.includes(g) ?
    g as GeneroType : g

const parentescos = Array.from(new Set(dependentesRaw.map(d => d.Parentesco)));
export const parentesco = (p: string): ParentescoType | string =>
  parentescos.includes(p) ?
    p as ParentescoType : p


const eventosTypes = Array.from(new Set(eventosRaw.map(e => e.Tipo_evento)));
export const eventosType = (e: string): TipoEventoType | string =>
  eventosTypes.includes(e) ?
    e as TipoEventoType : e

export const getAttrs = (db: Array<any>, checkEmpty: boolean) => {
  const map = new Map();
  map.set("_Total", 0)
  for (let index = 0; index < db.length; index++) {
    const dep = db[index];
    if (dep) {
      Object.keys(dep).forEach(k => {
        if (checkEmpty && dep[k] != "")
          map.set(k, (map.get(k) || 0) + 1);
      });
      map.set("_Total", map.get("_Total") + 1)
    }
  }
  return map;
}

export function diffTuple<T>(arrayA: T[], arrayB: T[],
  compare: (a: T, b: T) => number): { a: T | null, b: T | null }[] {
  const array: { a: T | null, b: T | null }[] = [];
  arrayA.sort(compare);
  arrayB.sort(compare);
  for (let indexA = 0, indexB = 0; indexA < arrayA.length && indexB < arrayB.length;) {
    const a = arrayA[indexA]
    const b = arrayB[indexB]
    const cmp = compare(a, b);
    if (cmp == 0) {
      array.push({ a, b });
      indexA++;
      indexB++;
    } else if (cmp > 0) {
      array.push({ a, b: null });
      indexB++;
    } else {
      array.push({ a: null, b })
      indexA++;
    }
  }
  return array;
}

export function diffArray<T>(arrayA: T[], arrayB: T[],
  compare: (a: T, b: T) => number): T[] {
  const array: T[] = [];
  arrayA.sort(compare);
  arrayB.sort(compare);
  for (let indexA = 0, indexB = 0; indexA < arrayA.length && indexB < arrayB.length;) {
    const a = arrayA[indexA]
    const b = arrayB[indexB]
    const cmp = compare(a, b);
    if (cmp == 0) {
      array.push(a);
      indexA++;
      indexB++;
    } else if (cmp > 0) {
      array.push(a);
      indexB++;
    } else {
      array.push(b)
      indexA++;
    }
  }
  return array;
}