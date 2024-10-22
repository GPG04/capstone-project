const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")

//Returns an array of all reviews
router.get("/"), async (req, res, next) => {
    try {
        const reviews = await prisma.review.findMany()
        res.json(reviews)
    } catch {
        next()
    }
}

//Returns an array of comments associated with a certain review
router.get("/:id/comments", async (req, res, next) => {
    try {
        const id = +req.params.id

        const review = await prisma.review.findUnique({ where: { id } })
        if (!review) {
            return next({
                status: 404,
                message: `Could not find review with id ${id}.`
            })
        }

        const comments = await prisma.comment.findMany({ where: { reviewId: id } })
        res.json(comments)       
    } catch {
        next()
    }
})

// Updates a review by id
router.put("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id

        const reviewExists = await prisma.review.findUnique({ where: { id } })
        if (!reviewExists) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}`
            })
        }

        const {
            rating,
            textContent
        } = req.body

        const review = await prisma.review.update({
            where: { id },
            data: {
                rating,
                textContent
            }
        })

        res.json(review)
    } catch {
        next()
    }
})

// Deletes a review by id
router.delete("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id

        const review = await prisma.review.findUnique({ where: { id } })
        if (!review) {
            return next({
                status: 404,
                message: `Could not find review with id ${id}`
            })
        }

        await prisma.review.delete({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        
    }
})

// Creates a comment for the review with the specified id
router.post("/:id/comments", async (req, res, next) => {
    try {
        const id = +req.params.id

        const review = await prisma.review.findUnique({ where: { id } })
        if (!review) {
            return next({
                status: 404,
                message: `Could not find review with id ${id}`
            })
        }

        const { textContent, userId } = req.body

        const result = await prisma.comment.create({
            data: {
                textContent,
                review: { connect: { id } },
                user: { connect: { userId } }
            }
        })

        res.json(result)
    } catch {
        next()
    }
})