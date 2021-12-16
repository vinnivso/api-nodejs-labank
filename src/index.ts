import { app } from "./app"
import { EndpointCreateUser } from "./endpoints/EndpointCreateUser"
import { EndpointDeleteUser } from "./endpoints/EndpointDeleteUser"
import { EndpointGetAllUsers } from "./endpoints/EndpointGetAllUsers"
import { EndpointGetBalance } from "./endpoints/EndpointGetBalance"
import { EndpointInsertBalance } from "./endpoints/EndpointInsertBalance"
import { EndpointPayDay } from "./endpoints/EndpointPayDay"
import { EndpointTransfer } from "./endpoints/EndpointTransfer"

//POST
app.post("/users", new EndpointCreateUser().createUser)
app.post("/users/transfer", new EndpointTransfer().transfer)

//PUT
app.put("/users/balance", new EndpointInsertBalance().insertBalance)
app.put("/users/payment", new EndpointPayDay().payDay)

//GET
app.get("/users", new EndpointGetAllUsers().getAllUsers)
app.get("/users/balance", new EndpointGetBalance().getBalance)

//DELETE
app.delete("/users", new EndpointDeleteUser().deleteUser)