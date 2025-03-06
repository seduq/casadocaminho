import { parse as csvparse } from "csv"
import * as fs from "fs"

const familyFile = fs.readFileSync("../../database/Familia.csv")
const familyParse = csvparse(familyFile, {
  delimiter: ";"
})
const familyRawCsv: string[][] = await familyParse.toArray();
const _headers = familyRawCsv.shift();
enum Headers { "CodFamilia", "DataInc", "DataExclusao", "MotivoEclusao", "NomeTitular", "Endereco", "numero", "Bairro", "CEP", "Telefone", "Recado", "Sexo", "DataNasc", "Natural", "Escolaridade", "TempoSaoPaulo", "Renda", "Aluguel", "Eletropaulo", "Sabesp", "Despesa1", "TextoDesp1", "Despesa2", "TextoDesp2", "CodEvento", "TipoDocumento", "NumeroDoc", "Status" }

type HeaderName = keyof typeof Headers;
type HeaderValue = {
  [key in HeaderName]: string;
};


export const familiesCsv = familyRawCsv.flatMap(csvRaw => {
  if (csvRaw.length != Object.values(Headers).length)
    return undefined;
  const familia: HeaderValue = {
    CodFamilia: "",
    DataInc: "",
    DataExclusao: "",
    MotivoEclusao: "",
    NomeTitular: "",
    Endereco: "",
    numero: "",
    Bairro: "",
    CEP: "",
    Telefone: "",
    Recado: "",
    Sexo: "",
    DataNasc: "",
    Natural: "",
    Escolaridade: "",
    TempoSaoPaulo: "",
    Renda: "",
    Aluguel: "",
    Eletropaulo: "",
    Sabesp: "",
    Despesa1: "",
    TextoDesp1: "",
    Despesa2: "",
    TextoDesp2: "",
    CodEvento: "",
    TipoDocumento: "",
    NumeroDoc: "",
    Status: ""
  }
  Object.keys(Headers).forEach((h, i) => familia[h as HeaderName] = csvRaw[i]);
  return familia;
}).filter(f => f != undefined).map(f => ({
  CodFamilia: f["CodFamilia"],
  /**
   * Muitos não contém nome válido:
   *  58 contém "CANC. P/ DUPL" - asumindo duplicidade, sendo 13 sem motivo de exclusão
   * 16 contém "FALEC." - assumindo falecimento, sendo 4 sem motivo de exclusão e data de exclusão
   */
  NomeTitular: f["NomeTitular"],
  DataNasc: process.env.prod ? f["DataNasc"] : "#".repeat(9),
  Sexo: f["Sexo"],

  /**
   * Existem telefones com apenas recado, e não um telefone padrão. Assumindo a função de cada um separadas.
   */
  Telefone: process.env.prod ? f["Telefone"] : "#".repeat(11),
  TelefoneRecado: process.env.prod ? f["Recado"] : "#".repeat(11),

  TipoDocumento: f["TipoDocumento"],
  NumeroDoc: process.env.prod ? f["NumeroDoc"] : "#".repeat(13),
  Status: f["Status"],

  Endereco: f["Endereco"],
  Numero: f["numero"],
  Bairro: f["Bairro"],
  CEP: f["CEP"],
  Recado: f["Recado"],

  Natural: f["Natural"],

  Escolaridade: f["Escolaridade"],

  TempoEmSaoPaulo: f["TempoSaoPaulo"],

  Renda: f["Renda"],

  Aluguel: f["Aluguel"],

  /**
   * Contem apenas 0 ou -1, esse sendo uma família (id: 5279), sem razão para armazenamento. Não serão inclusos.
   */
  // Eletropaulo: f["Eletropaulo"],
  // Sabesp: f["Sabesp"],

  // Nenhuma despesa cadastrada
  // Despesa1: f["Despesa1"],
  // TextoDesp1: f["TextoDesp1"],
  // Despesa2: f["Despesa2"],
  // TextoDesp2: f["TextoDesp2"],

  /*
   Contém apenas dois relacionamentos com o primeiro evento cadastrado, sem OBS pré SETEMBRO/2010 que contém CodFamilia (Evento), único relacionamento. Essas famílias não existem sem esse evento atrelado. Será inserido a família sem essa conexão
   */
  // CodEvento: f["CodEvento"], 


  /* 
    1183 Exclusão
    Todos com exclusão tem data de exclusão,
    porém nem todos tem data de inclusão (167).
    Existem 5 com data de exclusão, sem motivo.
    Desses 5: 
      2 não tem data de inclusão
      2 tem motivo no nome de titular (duplicado)
        id: 1045: motivo: ~CANC. P/ DUPL - 1024
        (com data de inclusão)
        id: 1782: motivo: ~CANC. P/ DUPL - 1247 (sem data de inclusão)
      3 com nome de titular e sem dados
        2 estão inativos
        1 ativo (2693) sem data de inclusão
    Existem 4 sem data de exclusão com FALEC.
    Existem 12 sem data de exclusão com CANC.
    
   Existem motivos de exclusão de teste
  */
  DataInc: f["DataInc"],
  DataExclusao: f["DataExclusao"],
  MotivoEclusao: f["MotivoEclusao"],
}));