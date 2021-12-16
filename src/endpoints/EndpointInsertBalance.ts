import express from "express"
import accounts from "../data/accounts"
import { InterfaceAccount } from "../entities/InterfaceAccount"

export class EndpointInsertBalance {
  async insertBalance(request:express.Request, response:express.Response): Promise<any>{
    try {

      const document:number = Number(request.headers.document)
      const balance:number = Number(request.headers.balance)
      if(document && balance) {
        const userIndex:number = accounts.findIndex((element) => element.document === document)
        if(userIndex !== -1) {
          const user = accounts[userIndex]
          const newUser:InterfaceAccount = {
            ...user,
            balance: (user.balance += balance)
          }

          const today = new Date()
          const currentDay = today.getDate()
          const currentMonth = today.getMonth() + 1
          const currentYear = today.getFullYear()

          const newStatement = {
            value:balance,
            date:`${currentDay}/${currentMonth}/${currentYear}`,
            description: `Credit added`
          }
          newUser.statement.push(newStatement)
          accounts[userIndex] = newUser
        } else {
          response.status(422).json({message:`User not found`})
        }
        response.json({message:`Credit successfully added`})
      } else {
        response.status(422).json({message:`Please, verify the inputed data`})
      }


    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}