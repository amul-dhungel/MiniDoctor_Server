const express = require('express')
const { Schema, Mongoose } = require('mongoose')
const { schema } = require('../models/doctor.model')
const Doctors = require('../models/doctor.model')
const Hospitals = require('../models/hospitals.model')

const router = express.Router()


router.route("/doc").get((req, res) => res.json
    ({
        status: "all doctors"
    })

)

// post the details of doctors

router.route('/doctorDetails/:id').post(async (req, res) => {
    console.log("Inside the register");
    const doctors = new Doctors({
        name: req.body.name,
        email: req.body.email,
        hospitalID: await Hospitals.find({ name: req.params.id }).populate('hospitalID').exec()

    })
    doctors
        .save()
        .then(async () => {
            res.status(200).json({
                status: "ok",
            })

        })
        .catch((err) => {
            res.status(403).json({ msg: err })
        })
})

module.exports = router