const {
    isLoggedIn
    } = require("../prisma/db")

const router = require("express").Router()
module.exports = router

const prisma = require("../prisma")
const { verify } = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        const id = req.params.id
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
        hash = await bcrypt.hash( password, 5 )

        res.json(
            await prisma.user.create({
                data: {
                    username: username,
                    password: hash
                }
            })
        )
    } catch (error) {
        next(error)
    }
})

// Updates a user by id
router.put("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await prisma.user.findUnique({ where: { id } })  

        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        if (
            req.user.id !== user.id &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        const { username } = req.body
        if (!username) {
            return next({
                status: 400,
                message: "User must have a username."
            })
        }

        res.json(
            await prisma.user.update({
                where: { id },
                data: { username }
            })
        )
    } catch (error){
        next(error)
    }
})

// Deletes a user by id
router.delete("/:id", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await prisma.user.findUnique({ where: { id } })

        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        if (
            req.user.id !== user.id &&
            req.user.isAdmin === false
        ) {
            const error = Error('not authorized')
            error.status = 401
            throw error
        }

        await prisma.user.delete({ where: { id } })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
})

// Creates a new item for the user with the specified id
router.post("/:id/items", isLoggedIn, async (req, res, next) => {
    try {
        const id = req.params.id
        const user = await prisma.user.findUnique({ where: { id } })
        
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        if (
            req.user.id !== id &&
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
        
        if (!name) {
            error = Error('Item must have a name.')
            error.status = 400
            throw error
        }

        res.json(
            await prisma.item.create({
                data: {
                    name,
                    image,
                    description,
                    header,
                    user: { connect: { id } }
                }
            })
        )
    } catch (error) {
        next(error)
    }
})

// returns an array of items from a certain user
router.get("/:id/items", async (req, res, next) => {
    try {
        console.log("Lincoln")
        const id = req.params.id

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
        const id = req.params.id

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        const reviews = await prisma.review.findMany({
            where: {
                userId: {
                    equals: `${id}`
                }
            },
            select: {
                id: true,
                rating: true,
                text: true,
                user: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                }
            }
        })

        res.json(reviews)
    } catch {
        next()
    }
})

//Returns an array of comments from a certain user
router.get("/:id/comments", async (req, res, next) => {
    try {
        const id = req.params.id

        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return next({
                status: 404,
                message: `Could not find user with id ${id}.`
            })
        }

        const comments = await prisma.comment.findMany({
            where: {
                userId: {
                    equals: `${id}`
                }
            },
            select: {
                id: true,
                text: true,
                user: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                }
            }
        })
        
        res.json(comments)
    } catch (error) {
        console.error(error)
    }
})