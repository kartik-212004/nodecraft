import Express from "express"
import { authRouter, credentialsRouter, workflowRouter } from "./routes"
import { PORT } from "@repo/env"

const app = Express()

app.use(Express.json())
app.use("/auth", authRouter)
app.use("/", credentialsRouter)
app.use("/", workflowRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})