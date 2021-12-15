import { app } from "./app"
import { EndpointGetAllUsers } from "./endpoints/EndpointGetAllUsers"


app.get("/users", new EndpointGetAllUsers().getAllUsers)