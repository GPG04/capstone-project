const router = require("express").Router()
module.exports = router

router.use("/users", require("./users"))
router.use("/items", require("./items"))
router.use("/reviews", require("./reviews"))
router.use("/comments", require("./comments"))

const {
    isLoggedIn,
    authenticate
} = require("../prisma/db")

const prisma = require("../prisma")

// Log in
router.post("/auth/login", async (req, res, next) => {
    try {
        res.send(await authenticate(req.body.username, req.body.password))
    } catch (error) {
        next(error)
    }
})

router.get("/auth/me", isLoggedIn, async (req, res, next) => {
    try {
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})