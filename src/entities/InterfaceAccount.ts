import { InterfaceTransaction } from "./InterfaceTransaction";

export interface InterfaceAccount {
  id:string
  name: string
  birthDate: string
  document: number
  balance: number
  statement: Array<InterfaceTransaction>
}