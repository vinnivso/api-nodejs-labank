import express from "express"
import accounts from "../data/accounts"
import { ManageDate } from "../services/ManageDate"
import { EndpointGetBalance } from "./EndpointGetBalance"

export class EndpointPayDay {
  async payDay(request:express.Request, response:express.Response):Promise<any> {
    try {
      const document:number = Number(request.headers.document)
      if(!document) {
        response.status(406).json({message:`Please, insert your document number`})
      }

      let {value, date, description} = request.body
      if(!value || !description) {
        response.status(422).json({message:`Please, verify the inputed data`})
      }

      if(!date) {
        let today = new Date()
        const dd = String(today.getDate()).padStart(2, "0")
        const mm = String(today.getMonth() + 1).padStart(2, "0") //JAN is ZERO, 0
        const yyyy = today.getFullYear()
        date = `${dd}/${mm}/${yyyy}`
      }

      const dateInformed = new ManageDate().ageFromDateInformedByUser(date)
      if(dateInformed === false) {
        response.status(406).json({message:`You cannot complete the payment before this date`})
      }

      const newStatement = {
        value,
        date,
        description
      }

      const user = accounts.filter((element) => {
        if(element.document === document) {
          element.balance -= value
          element.statement.push(newStatement)
          return true
        } else {
          return false
        }
      })

      if(user) {
        response.json({message:`Payment completed`})
      } else {
        response.status(404).json({message:`User not found`})
      }


    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}