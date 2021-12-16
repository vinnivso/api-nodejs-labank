import express from "express"
import accounts from "../data/accounts"

export class EndpointGetBalance {
  async getBalance(request:express.Request, response:express.Response):Promise<void> {
    try {

      const document:number = Number(request.headers.document)
      if(document){
        const search: {}[] = accounts
          .filter((element) => {
            if(element.document === document) {
              return element
            }
          })
          .map((element) => {
            const balance:{} = {
              balance: element.balance
            }
            return balance
          })

        if(search.length > 0) {
          response.send(search)
        } else {
          response.status(404).json({message:`User not found`})
        }
      } else {
        response.status(422).json({message:`Please, verify the inputed data`})
      }


    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}