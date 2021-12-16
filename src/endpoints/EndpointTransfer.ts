import express from "express"
import accounts from "../data/accounts"
import { InterfaceAccount } from "../entities/InterfaceAccount"

export class EndpointTransfer {
  async transfer(request:express.Request, response:express.Response):Promise<any>{
    try {

      const name = request.headers.name
      const document:number = Number(request.headers.document)
      const value:number = Number(request.headers.value)
      const {recipientName} = request.body
      const recipientDocument:number = Number(request.body.recipientDocument)
      if(!name || !document || !recipientName || !recipientDocument || !value) {
        response.status(422).json({message:`Please, verify the inputed data`})
      }

      const user: InterfaceAccount[] = accounts.filter((element) => {
        if(element.document === document) {
          if(element.balance < value) {
            response.status(406).json({message:`You don't have sufficient credits to complete the transaction`})
          }

          const today = new Date()
          const currentDay = today.getDate()
          const currentMonth = today.getMonth() + 1
          const currentYear = today.getFullYear()

          const newStatement = {
            value,
            date:`${currentDay}/${currentMonth}/${currentYear}`,
            description:`Transaction DONE in a value of ${value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })} to ${recipientName}, ${recipientDocument}`
          }
          element.balance -= value
          element.statement.push(newStatement)
          return true
        } else {
          return false
        }
      })

      const recipient: InterfaceAccount[] = accounts.filter((element) => {
        if(element.document === recipientDocument) {
          const today = new Date()
          const currentDay = today.getDate()
          const currentMonth = today.getMonth() + 1
          const currentYear = today.getFullYear()

          const newStatement = {
            value,
            date:`${currentDay}/${currentMonth}/${currentYear}`,
            description:`Transaction received from ${name}, ${document} in a value of ${value.toLocaleString("pt-BR", {
              style:"currency",
              currency:"BRL"
            })}`
          }
          element.balance += value
          element.statement.push(newStatement)
          return true
        } else {
          return false
        }
      })

      if(user || recipient) {
        response.json({message:`Transaction successfull`})
      } else {
        response.status(404).json({message:`User not found`})
      }

      
    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}