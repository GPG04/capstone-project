const {
    createUser,
    isLoggedIn,
    authenticate
    } = require("../prisma/db")

const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")
const { verify } = require("jsonwebtoken")

// Returns an array of all users
router.get("/", async (req, res, next) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        next(error)
    }
})

// Returns a single user by id
router.get("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id
        
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}`
            })
        }

        res.json(user)
    } catch {
        next()
    }
})

// Creates a new user
router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body
         result = createUser( username, password )

        res.json(result)
    } catch (error) {
        next(error)
    }
})

// Updates a user by id
router.put("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id
        console.log(id)

        const userExists = await prisma.user.findUnique({ where: { id } })
        if (!userExists) {
            return next({
                status: 404,
                message: `Could not find author with id ${id}.`
            })
        }

        const { username } = req.body
        if (!username) {
            return next({
                status: 400,
                message: "User must have a username."
            })
        }

        const user = await prisma.user.update({
            where: { id },
            data: { username }
        })

        res.json(user)
    } catch {
        next()
    }
})

// Deletes a user by id
router.delete("/:id", async (req, res, next) => {
    try {
        const id = +req.params.id

        const userExists = await prisma.user.findUnique({ where: { id } })
        if (!userExists) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}`
            })
        }

        await prisma.user.delete({ where: { id } })
        res.sendStatus(204)
    } catch {
        next()
    }
})

// Creates a new item for the user with the specified id
router.post("/:id/items", async (req, res, next) => {
    try {
        const id = +req.params.id

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        const { 
            name,
            image,
            description,
            textContent
             } = req.body
        
             if (!name) {
            return next({
                status: 400,
                message: "Item must have a name."
            })
        }
        
        const result = await prisma.item.create({
            data: {
                name,
                image,
                description,
                textContent,
                user: { connect: { id } }
                }
        })

        res.json(result)
    } catch {
        next()
    }
})

// returns an array of items from a certain user
router.get("/:id/items", async (req, res, next) => {
    try {
        const id = +req.params.id

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        const items = await prisma.item.findMany({ where: { userId: id } })

        res.json(items)
    } catch {
        next()
    }
})

// Returns an array of reviews from a certain user
router.get("/:id/reviews", async (req, res, next) => {
    try {
        const id = +req.params.id

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        const reviews = await prisma.review.findMany({ where: { userId: id } })
        res.json(reviews)
    } catch {
        next()
    }
})

//Returns an array of comments from a certain user
router.get("/:id/comments", async (req, res, next) => {
    try {
        const id = +req.params.id

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        const comments = await prisma.comment.findMany({ where: { userId: id } })
        res.json(comments)
    } catch (error) {
        
    }
})