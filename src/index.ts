import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/EndpointCreateUser"
import { EndpointGetAllUsers } from "./endpoints/EndpointGetAllUsers"
import { EndpointInsertBalance } from "./endpoints/EndpointInsertBalance"

//POST
app.post("/users", new EndpointCreateUser().createUser)

//PUT
app.put("/users/balance", new EndpointInsertBalance().insertBalance)

//GET
app.get("/users", new EndpointGetAllUsers().getAllUsers)