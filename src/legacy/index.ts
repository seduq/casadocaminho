// import { familiasCsv } from './src/csv/familias';
// import { dependentes, dependentesSemParentesco } from './src/dependentes';
// import { eventoList, eventos, eventosSemDescricao, eventosSemFamilias, eventosSemInicioFim, eventoType } from './src/eventos';
// import { familiaNaoAssista, familias, familiasSemCodigo, familiasSemEventos, familiasSemTitular } from './src/familias';
// import { presencas } from './src/presencas';
// import { getAttrs } from './src/utils'




//const familiaCsvSet = familiaCsv.map(f => f[""])


/*
console.log("Dependentes", getAttrs(dependentes, true));
console.log("Eventos", getAttrs(eventos, true));
console.log("Familias", getAttrs(familias, true));
console.log("Presencas", new Set(getAttrs(presencas, true)));


console.log("Familia sem nome de titular", familiasSemTitular.map(f => f.Codigo))
const overlap = new Set(familiaNaoAssista.map(f => f.Titular_Nome))
const hasAll = familiasSemCodigo.map(f => f.Titular_Nome).find(f => !overlap.has(f));
console.log("Familias sem codigo e não assistidas são mesma lista", hasAll ? "Sim" : "Não");
const eventosSemFamiliasDescricaoInicioFim = Array.from([...eventosSemFamilias, ...eventosSemDescricao, ...eventosSemInicioFim])
console.log("Eventos sem Familias, Descricao ou Data", eventosSemFamiliasDescricaoInicioFim.map(e => e.Descricao));
console.log("Dependentes sem parentesco", dependentesSemParentesco.map(d => d.Nome));
console.log("Familias sem evento", familiasSemEventos.map(f => f.Codigo))

*/