import express from "express"
import * as uuid from "uuid"
import accounts from "../data/accounts"
import { InterfaceAccount } from "../entities/InterfaceAccount"
import { ManageDate } from "../services/ManageDate"


export class EndpointCreateUser {
  async createUser(request:express.Request, response: express.Response): Promise<any> {
    try {

      const {name, birthDate, document} = request.body
      if(!name || !birthDate || !document){
        response.status(422).json({message:`All fields are required`})
      }

      const informedAge = new ManageDate().ageFromDateOfBirthday(birthDate)
      if(informedAge < 18) {
        response.status(406).json({message:`The user must have the minimum legal age (18 years old)`})
      }

      const informedDocument = accounts.find((element) => element.document === document)
      if(informedDocument){
        response.status(406).json({message:`The user already exists`})
      }

      const newUser: InterfaceAccount = {
        id:uuid.v4(),
        name,
        birthDate,
        document,
        balance: 0,
        statement:[]
      }
      accounts.push(newUser)
      response.status(201).json({message:`User registered successfully`})


    } catch (error:any) {
      response.json({message:error.message})
    }
  }
}