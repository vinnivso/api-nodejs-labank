import { InterfaceTransaction } from "./InterfaceTransaction";

export interface InterfaceAccount {
  name: string
  birthDate: string
  document: number
  balance: number
  statement: Array<InterfaceTransaction>
}