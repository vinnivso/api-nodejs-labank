import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/EndpointCreateUser"
import { EndpointGetAllUsers } from "./endpoints/EndpointGetAllUsers"
import { EndpointGetBalance } from "./endpoints/EndpointGetBalance"
import { EndpointInsertBalance } from "./endpoints/EndpointInsertBalance"

//POST
app.post("/users", new EndpointCreateUser().createUser)

//PUT
app.put("/users/balance", new EndpointInsertBalance().insertBalance)

//GET
app.get("/users", new EndpointGetAllUsers().getAllUsers)
app.get("/users/balance", new EndpointGetBalance().getBalance)