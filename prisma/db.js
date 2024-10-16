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

    await prisma.user.create({ data: user })
}

async function authenticate( username, password ) {

    const user = await prisma.user.findUnique({ where: { username } })
    if (!user.username || await bcrypt.compare(password, user.password) === false) {
        const error = Error("not authorized")
        error.status = 401
        throw error
    }

    const token = await jwt.sign({ id: user.id, JWT })
    console.log(token)
    return { token }
}

module.exports = {
    createUser,
    authenticate
}