require('dotenv/config')
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceID = process.env.TWILIO_SERVICE_ID
const client = require('twilio')(accountSid, authToken)

app.get('/login', (req, res) => {
    // client.messages.create({
    //     body: "This is the text",
    //     from: '+12604758096',
    //     to: '+9779819067945'
    // })
    //     .then((message) => console.log(message))
    //     .catch((err) => console.log(err))
    client
        .verify
        .services(serviceID)
        .verifications
        .create({
            to: `+${req.query.phonenumber}`,
            channel: req.query.channel
        })
        .then((data) => {
            res.status(200).send(data)
        })
})