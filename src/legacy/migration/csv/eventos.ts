import { parse as csvparse } from "csv"
import * as fs from "fs"
const eventFile = fs.readFileSync("../../database/Evento.csv")
const familyParse = csvparse(eventFile, {
  delimiter: ";"
})
const familyRawCsv: string[][] = await familyParse.toArray();
const _headers = familyRawCsv.shift();


enum DetalheEvento {
  "CodDetEvento", "CodFamilia", "NomeTitular", "CodDepend", "NomeDep", "Qtde", "CodEvento", "NomeTitular1", "NomeDepOutro"
}
enum Evento {
  "CodEventos", "CodFamilia", "TipoEvento", "DataInc", "CodDistribuicao", "OBS"
}

