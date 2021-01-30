const express = require('express')
const User = require('../models/users.model')
const Prescription = require('../models/prescription.model')
const config = require('./authconfig/config')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')
const multer = require('multer')
const path = require("path")
const { profile } = require('console')
const usersModel = require('../models/users.model')
const Hospitals = require('../models/hospitals.model')

const router = express.Router()

// image upload in database or multer configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./prescription Pic")
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.phoneNumber + ".jpg")
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    //fileFilter: fileFilter
})

// checking API

router.route("/presc").get((req, res) => res.json
    ({
        status: "Prescription details ready"
    })

)

// adding and update profile image

router.route("/prescription/image")
    .patch(middleware.checkToken, upload.single("img"), (req, res) => {
        Prescription.findOneAndUpdate(
            { phoneNumber: req.decoded.phoneNumber },
            {
                $set: {
                    img: req.file.path
                }
            },
            { new: true },
            (err, user) => {
                if (err) return res.status(500).send(err)
                const response = {
                    message: "Image added sucessfully updated",
                    data: user,
                }
                return res.status(200).send(response)
            }
        )
    })


// register or adding user data details to the database

router.route('/prescription/:id').post(middleware.checkToken, async (req, res) => {
    console.log("Inside the register");
    const prescription = new Prescription({
        hospitalID: await Hospitals.find({ name: req.params.id }).populate('hospitalID').exec(),
        userID: await User.findOne({ phoneNumber: req.decoded.phoneNumber }).populate('userID').exec()
    })
    prescription
        .save()
        .then(() => {
            res.status(200).json({
                status: "Prescription added",
                token: token
            })

        })
        .catch((err) => {
            res.status(403).json({ msg: err })
        })
})










module.exports = router