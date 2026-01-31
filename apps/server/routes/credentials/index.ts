import Express, { Router } from "express"

const router: Router = Router()
router.use(Express.json())

router.post("/credential", (req, res) => {
})


export { router as credentialsRouter }