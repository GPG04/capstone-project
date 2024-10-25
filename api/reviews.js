const {
    isLoggedIn
} = require('../prisma/db')

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
        const id = req.params.id

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
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const review = await prisma.review.findUnique({ where: { id } })
        
        if (!review) {
            const error = Error(`Could not find review with id ${id}.`)
            error.status = 404
            throw error
        }

        if (
            req.user.id !== review.userId &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        const {
            rating,
            text
        } = req.body

        res.json(
            await prisma.review.update({
                where: { id },
                data: {
                    rating,
                    text
                }
            })
        )
    } catch (error) {
        next(error)
    }
})

// Deletes a review by id
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const review = await prisma.review.findUnique({ where: { id } })

        if (!review) {
            return next({
                status: 404,
                message: `Could not find review with id ${id}`
            })
        }

        if (
            req.user.id !== review.id &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        await prisma.review.delete({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        
    }
})

// Creates a comment for the review with the specified id
router.post("/:id/comments", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const userId = req.user.id
        const review = await prisma.review.findUnique({ where: { id } })
        
        if (!review) {
            error = Error(`Could not find review with id ${id}.`)
            error.status = 401
            throw error
        }

        const { text } = req.body
        res.json(
            await prisma.comment.create({
                data: {
                    text,
                    review: { connect: { id } },
                    user: { connect: { userId } }
                }
            })
        )
    } catch (error) {
        next(error)
    }
})