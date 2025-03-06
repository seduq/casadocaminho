import { parse as csvparse } from "csv"
import * as fs from "fs"

const familiaFile = fs.readFileSync("../../database/Dependente.csv")
const familiaParse = csvparse(familiaFile, {
  delimiter: ";"
})
const familiaRawCsv: string[][] = await familiaParse.toArray();
const _headers = familiaRawCsv.shift();

enum Headers {
  "CodDependente", "CodFamilia", "DataInc", "NomeDep", "DataNasc", "Parentesco", "Escolaridade", "Sexo", "CodParentesco", "Status"
}
