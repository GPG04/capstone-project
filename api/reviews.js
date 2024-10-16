const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")

//Returns an array of comments associated with a certain review
router.get("/:id/comments", async (req, res, next) => {
    try {
        const [id, reviewId] = +req.params.id

        const review = await prisma.review.findUnique({ where: { id } })
        if (!review) {
            return next({
                status: 404,
                message: `Could not find review with id ${id}.`
            })
        }

        const comments = await prisma.comment.findMany({ where: { reviewId } })
        res.json(comments)       
    } catch {
        next()
    }
})