require('dotenv/config')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceID = process.env.TWILIO_SERVICE_ID
const client = require('twilio')(accountSid, authToken)
const express = require('express')

// instance of router

const router = express.Router()


//routing or transferring it to the specific page,method.


var verificationID = Math.floor(Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1))
var smscode

// route of sending verification code

router.route('/login').get((req, res) => {
    client.messages.create({
        body: verificationID,
        from: '+12604758096',
        to: `+${req.query.phoneNumber}`

    })
        .then(() => res.send("Message sent"))
        .catch((err) => console.log(err))

})

// route of verification phone authentication

router.route('/verify').get((req, res) => {

    smscode = `${req.query.smscode}`
    if (smscode == verificationID) {
        res.send("verified")
    } else {
        res.send("Not verified")
    }
})

module.exports = router