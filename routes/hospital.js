const express = require('express')
const Hospitals = require('../models/hospitals.model')
const Doctors = require('../models/doctor.model')

const router = express.Router()


router.route("/hos").get((req, res) => res.json
    ({
        status: "all fine"
    })

)

// post the details of hospitals

router.route('/hospitalDetails').post((req, res) => {
    console.log("Inside the register");
    const hospitals = new Hospitals({
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
    })
    hospitals
        .save()
        .then(async () => {
            // const doctor = await Doctors.findById({ _id: hospitals.doctorsID })
            // doctor.hospitalID.push(hosptials)
            // await doctor.save()

            res.status(200).json({
                status: "ok",
            })

        })
        .catch((err) => {
            res.status(403).json({ msg: err })
        })
})

//get hospitals names from database

router.route("/hospitalNames").get((req, res) => {
    Hospitals.find((err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })

}
)

module.exports = router