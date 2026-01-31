import Express, { Router } from "express"

const router: Router = Router()

router.use(Express.json())
router.post("/signup", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }
})
router.post("/signin", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" })
    }
})

export { router as authRouter }