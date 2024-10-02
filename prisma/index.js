const { PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;

require("dotenv").config()
const pg = require('pg')
const express = require('express')
const app = express()
app.use(express.json())
const client = new pg.Client(process.env.DATABASE_URL)