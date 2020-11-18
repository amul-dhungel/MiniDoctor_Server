const express = require('express')
const mongoose = require('mongoose')
const port = process.env.port || 5000
const app = express()

mongoose.connect('mongodb://localhost:27017/AppDB', { useNewUrlParser: true });

const connection = mongoose.connection
connection.once("open", () => {
    console.log("Mongodb Connected")
})

//middleware
app.use(express.json())
const userRoute = require('./routes/user')
app.use('/user', userRoute)

app.route("/").get((req, res) => res.json("hello world"))

app.listen(port, () => console.log(`server is running on port ${port}`))


