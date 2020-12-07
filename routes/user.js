const express = require('express')
const User = require('../models/users.model')
const config = require('./authconfig/config')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')
const multer = require('multer')
const path = require("path")

const router = express.Router()

// image upload in database or multer configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
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
    fileFilter: fileFilter
})

// adding and update profile image

router.route("/register/image")
    .patch(middleware.checkToken, upload.single("img"), async (req, res) => {
        await User.findOneAndUpdate(
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

router.route('/register').post((req, res) => {
    console.log("Inside the register");
    const user = new User({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender
    })
    user
        .save()
        .then(() => {
            let token = jwt.sign({ phoneNumber: req.body.phoneNumber }, config.key, {
                expiresIn: "24h"
            })
            console.log("User registered")
            res.status(200).json({
                status: "ok",
                token: token
            })

        })
        .catch((err) => {
            res.status(403).json({ msg: err })
        })
})

router.route('/update/:username').patch(middleware.checkToken, (req, res) => {
    User.findOneAndUpdate(
        { username: req.params.username },
        { $set: { password: req.body.password } },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err })
            const msg = {
                msg: "password successfully updated",
                username: req.params.username,
            }

            return res.json(msg)
        }
    )
})

router.route('/delete/:username').delete(middleware.checkToken, (req, res) => {
    User.findOneAndDelete({ username: req.params.username }, (err, result) => {
        if (err) return status(500).json({ msg: err })
        const msg = {
            msg: "username deleted",
            username: req.params.username,
        }
        return res.json(msg)
    })
})



module.exports = router