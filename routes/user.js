const express = require('express')
const User = require('../models/users.model')
const config = require('../config')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware')

const router = express.Router()

router.route('/:username').get(middleware.checkToken, (req, res) => {
    User.find().exec().
        then(result => {
            res.status(200).json({
                details: result
            })
        }).catch(err => console.log(err))
})


router.route('/register').post((req, res) => {
    console.log("Inside the register");
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    user
        .save()
        .then(() => {
            console.log("User registered")
            res.status(200).json("ok")
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