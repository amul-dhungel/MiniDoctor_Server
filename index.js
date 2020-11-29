const express = require('express')
const mongoose = require('mongoose')
const port = process.env.PORT || 5000
const app = express()

// mongodb link setup

mongoose.connect('mongodb+srv://admin:admin@minidoctor.3ef6h.mongodb.net/AppDB?retryWrites=true&w=majority', { useNewUrlParser: true });

// mongodb connection setup

const connection = mongoose.connection
connection.once("open", () => {
    console.log("Mongodb Connected")
})

// email auth

app.use(express.json())
const userRoute = require('./routes/user')
app.use('/user', userRoute)

// phone auth

const phoneauth = require('./authconfig/phoneauth')
app.use('/', phoneauth)

//main section testing

app.route("/").get((req, res) => res.json("Hello World! This is the main page"))

// Listening port, i.e. setting up local main server port connection

app.listen(port, () => console.log(`Server is running on port ${port}`))


