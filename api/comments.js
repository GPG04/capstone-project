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
        const id = +req.params.id

        const comment = await prisma.comment.findUnique({ where: { id } })
        if (!comment) {
            return next({
                status: 404,
                message: `Could not find comment with id ${id}`
            })
        }

        res.json(comment)
    } catch {
        next()
    }
})

// Updates a comment by id
router.put("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id

        const commentExists = await prisma.comment.findUnique({ where: { id } })
        if (!commentExists) {
            return next({
                status: 404,
                message: `Could not find comment with id ${id}`
            })
        }

        const { textContent } = req.body

        const comment = await prisma.comment.update({
            where: { id },
            data: { textContent }
        })

        res.json(comment)
    } catch {
        next()
    }
})

// Deletes a comment by id
router.delete("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id

        const commentExists = await prisma.comment.findUnique({ where: { id } })
        if (!commentExists) {
            return next({
                status: 404,
                message: `Could not find comment with id ${id}`
            })
        }

        await prisma.comment.delete({ where: { id } })
        res.sendStatus(204)
    } catch {
        next()  
    }
})