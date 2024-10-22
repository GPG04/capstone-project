require("dotenv").config()
const pg = require('pg')
const bcrypt = require('bcrypt')
const prisma = require("../prisma")
const jwt = require('jsonwebtoken')
const JWT = process.env.JWT

const express = require('express')
const app = express()
app.use(express.json())

async function createUser( username, password ) {
    const user = {
        username: username,
        password: await bcrypt.hash(password, 5)
    }

    const result = await prisma.user.create({ data: user })
    return result
}

async function authenticate( username, password ) {
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user.username || await bcrypt.compare(password, user.password) === false) {
        const error = Error("not authorized")
        error.status = 401
        throw error
    }

    const token = await jwt.sign({ id: user.id }, JWT )
    return { token }
}

const findUserByToken = async (token) => {
    let id

    try {
        const payload = await jwt.verify(token, JWT)
        id = payload.id
    } catch (error) {
        error = Error('not authorized')
        error.status = 401
        throw error
    }
}

const isLoggedIn = async (req, res, next) => {
    try {
        req.user = await findUserByToken(req.headers.authorization)
        next()        
    } catch (error) {
        console.error(error)
        next(error)
    }
}

module.exports = {
    createUser,
    authenticate,
    isLoggedIn
}