require('dotenv/config')
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

// phone authentication

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken)

app.get('/login', (req, res) => {
    client.messages.create({
        body: "This is the text",
        from: '+12604758096',
        to: '+9779819067945'
    })
        .then((message) => console.log(message))
        .catch((err) => console.log(err))

    // .verify
    // .verifications
    // .create({
    //     to: `+${req.query.phonenumber}`,
    //     channel: req.query.channel
    // })
    // .then((data) => {
    //     res.status(200).send(data)
    // })
})


app.route("/").get((req, res) => res.json("hello world"))

app.listen(port, () => console.log(`server is running on port ${port}`))


