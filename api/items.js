const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")

// Returns an array of all items
router.get("/", async (req, res, next) => {
    try {
        const items = await prisma.item.findMany()
        res.json(items)
        console.log(res.json)
    } catch {
        next()
    }
})

/*
// Returns an array of reviews on a certain item
router.get("/:id/reviews", async (req, res, next) => {
    try {
        const id = +req.params.id

        const item = await prisma.item.findUnique({ where: { id } })
        if (!item) {
            return next({
                status: 404,
                message: `Could not find item with id ${id}.`
            })
        }

        const reviews = await prisma.review.findMany({ where: { itemId: id } })
        res.json(reviews)
    } catch {
        next()
    }
})

*/