const express = require("express");
const app = express();
const cors = require('cors')

const PORT = 3000;

app.use(express.json());
app.use(require("morgan")("dev"));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)

app.use("/api", require("./api"));

app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).send({ error: error })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});