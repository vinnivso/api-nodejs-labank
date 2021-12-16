import express from "express"
import accounts from "../data/accounts"

export class EndpointDeleteUser {
  async deleteUser(request:express.Request, response:express.Response) {
    try {

      const document:number = Number(request.headers.document)
      if(!document) {
        response.status(406).json({message:`Please, insert your document number`})
      }

      const user:any = accounts.find(element => element.document === document)
      if(!user) {
        response.status(400).json({message:`User not found`})
      }
      accounts.splice(user, 1)
      return response.json({message: `User deleted`})


    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}