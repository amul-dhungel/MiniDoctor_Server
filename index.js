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


// user details register
app.use(express.json())
const userRoute = require('./routes/user')
app.use('/user', userRoute)


// hospital details register
app.use(express.json())
const hospitalRoute = require('./routes/hospital')
app.use('/hospitals', hospitalRoute)


// doctor details register
app.use(express.json())
const doctorRoute = require('./routes/doctor')
app.use('/doctors', doctorRoute)


// prescription details
app.use(express.json())
const prescriptionRoute = require('./routes/prescription')
app.use('/PrescriptionSheet', prescriptionRoute)


// disease details
app.use(express.json())
const diseaseRoute = require('./routes/disease')
app.use('/diseases', diseaseRoute)


// manufacture details
app.use(express.json())
const manufactureRoute = require('./routes/manufacture')
app.use('/manufacture', manufactureRoute)


// profile picture route
app.use('/uploads', express.static("uploads"))


// phone auth
const phoneauth = require('./routes/authconfig/phoneauth')
app.use('/', phoneauth)


// medicine details
app.use(express.json())
const medicineRoute = require('./routes/medicine')
app.use('/medicine', medicineRoute)


//main section testing
app.route("/").get((req, res) => res.json(
    {
        status: "Healthy again"
    }
))


// Listening port, i.e. setting up local main server port connection
app.listen(port, "0.0.0.0", () => console.log(`Server is running on port ${port}`))


