require('dotenv/config')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceID = process.env.TWILIO_SERVICE_ID
const client = require('twilio')(accountSid, authToken)
const express = require('express')
const router = express.Router()

//routing or transferring it to the specific page,method.

router.route('/login').get((req, res) => {
    client.messages.create({
        body: Math.floor(Math.pow(10, 6 - 1) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 6 - 1) - 1)),
        from: '+12604758096',
        to: req.body.to
    })
        .then((message) => res.send("Message sent"))
        .catch((err) => console.log(err))
    // client
    //     .verify
    //     .services(serviceID)
    //     .verifications
    //     .create({
    //         to: `+${req.query.phonenumber}`,
    //         channel: req.query.channel
    //     })
    //     .then((data) => {
    //         res.status(200).send(data)
    //     })
})

module.exports = router