import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/EndpointCreateUser"
import { EndpointGetAllUsers } from "./endpoints/EndpointGetAllUsers"

//POSTS
app.post("/users", new EndpointCreateUser().createUser)

//GETS
app.get("/users", new EndpointGetAllUsers().getAllUsers)