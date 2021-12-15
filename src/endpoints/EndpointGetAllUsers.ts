import express from "express"
import accounts from "../data/accounts"

export class EndpointGetAllUsers {
  async getAllUsers(request:express.Request, response: express.Response): Promise<void> {
    try {
      if(accounts.length > 0) {
        response.send(accounts)
      } else {
        response.status(404).json({message:`Users not found in DB`})
      }
    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}