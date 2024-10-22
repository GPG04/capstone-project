const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")

// Returns an array of all items
router.get("/", async (req, res, next) => {
    try {
        const items = await prisma.item.findMany()
        res.json(items)
    } catch {
        next()
    }
})

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

// Updates an item by id
router.put("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id

        const itemExists = await prisma.item.findUnique({ where: { id } })
        if (!itemExists) {
            return next({
                status: 404,
                message: `Could not find item with id ${id}.`
            })
        }

        const {
            name,
            image,
            description,
            textContent
        } = req.body

        const item = await prisma.item.update({
            where: { id },
            data: {
                name,
                image,
                description,
                textContent
            }
        })

        res.json(item)
    } catch {
        next()
    }
})

// Deletes an item by id
router.delete("/:id", async (req, res, next) => {
    try {
        id = +req.params.id

        const itemExists = await prisma.user.findUnique({ where: { id } })
        if (!itemExists) {
            return next({
                status: 404,
                message: `Could not find item with id ${id}`
            })
        }

        await prisma.item.delete({ where: { id } })

        res.sendStatus(204)
    } catch {
        next()
    }
})

// Creates a review for an item with a certain id
router.post("/:id/reviews", async (req, res, next) => {
    try {
        const id = +req.params.id

        const item = await prisma.item.findUnique({ where: { id } })
        if (!item) {
            return next({
                status: 404,
                message: `Could not find item with id ${id}`
            })
        }

        const {
            rating,
            textContent,
            userId
        } = req.body

        if (!rating || !textContent) {
            return next({
                status: 400,
                message: "Review data is incomplete"
            })
        }

        const result = await prisma.item.create({
            data: {
                rating,
                textContent,
                item: { connect: { id } },
                user: { connect: { userId } }
            }
        })

        res.json(result)
    } catch {
        next()
    }
})
