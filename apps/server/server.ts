import Express from "express"
import { authRouter, credentialsRouter, workflowRouter } from "./routes"

const app = Express()

app.use(Express.json())
app.use("/auth", authRouter)
app.use("/", credentialsRouter)
app.use("/", workflowRouter)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})