const express = require("express")
const app = express()

const PORT = 3000

app.use(express.json())
app.use(require("morgan")("dev"))

app.use("/api", require("./api"))

app.use((error, req, res, next) => {
    res.status(res.status || 500).send({ error: error })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})