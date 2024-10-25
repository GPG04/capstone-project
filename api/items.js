const {
    isLoggedIn
} = require("../prisma/db")

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
        const id = req.params.id
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
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const item = await prisma.item.findUnique({ where: { id } })
        
        if (!item) {
            const error = Error(`Could not find item with id ${id}.`)
            error.status = 404
            throw error
        }

        if (
            req.user.id !== item.userId &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        const {
            name,
            image,
            description,
            header
        } = req.body

        res.json(
            await prisma.item.update({
                where: { id },
                data: {
                    name,
                    image,
                    description,
                    header
                }
            })
        )
    } catch (error) {
        next(error)
    }
})

// Deletes an item by id
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        id = req.params.id
        const item = await prisma.item.findUnique({ where: { id } })
        
        if (!item) {
            const error = Error(`Could not find item with id ${id}.`)
            error.status = 404
            throw error
        }

        if (
            req.user.id !== item.userId &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        await prisma.item.delete({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

// Creates a review for an item with a certain id
router.post("/:id/reviews", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const item = await prisma.item.findUnique({ where: { id } })

        if (!item) {
            const error = Error(`Could not find item with id ${id}.`)
            error.status = 404
            throw error
        }

        const {
            rating,
            text
        } = req.body

        if (!rating || !text) {
            return next({
                status: 400,
                message: "Review data is incomplete"
            })
        }

        res.json(
            await prisma.review.create({
            data: {
                rating,
                text,
                user: { connect: { id: userId } },
                item: { connect: { id } }
            }
        })
    )
    } catch (error) {
        next(error)
    }
})
