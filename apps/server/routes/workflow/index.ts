import Express, { Router } from "express"

const router: Router = Router()

router.use(Express.json())

router.get("/workflow/:workflowId", (req, res) => {

})

router.put("/workflow", (req, res) => {
})

router.get("/workflow/executions/:workflowId", (req, res) => {

})

router.put("/workflow", (req, res) => {
})

export { router as workflowRouter }