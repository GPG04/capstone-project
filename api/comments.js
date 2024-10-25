const {
    isLoggedIn
} = require("../prisma/db")

const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")

// Returns an array of all comments
router.get("/", async (req, res, next) => {
    try {
        const comments = await prisma.comment.findMany()
        res.json(comments)
    } catch (error) {
        next(error)
    }
})

// Returns a comment with a certain id
router.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const comment = await prisma.comment.findUnique({ where: { id } })

        if (!comment) {
            error = Error(`Could not find comment with id ${id}.`)
            error.status = 404
            throw error
        }

        res.json(comment)
    } catch (error) {
        next(error)
    }
})

// Updates a comment by id
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const comment = await prisma.comment.findUnique({ where: { id } })
        
        if (!comment) {
            error = Error(`Could not find comment with id ${id}.`)
            error.status = 404
            throw error
        }

        if (
            req.user.id !== comment.userId &&
            req.user.isAdmin === false
        ) {
            error = Error('not authorized')
            error.status = 401
            throw error
        }

        const { text } = req.body

        res.json(
            await prisma.comment.update({
                where: { id },
                data: { text }
            })
        )
    } catch (error) {
        next(error)
    }
})

// Deletes a comment by id
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const comment = await prisma.comment.findUnique({ where: { id } })
        
        if (!comment) {
            error = Error(`Could not find comment with id ${id}.`)
            error.status = 404
            throw error
        }

        if (
            req.user.id !== comment.userId &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        await prisma.comment.delete({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        next(error)  
    }
})