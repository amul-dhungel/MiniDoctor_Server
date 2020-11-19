const express = require('express')
const User = require('../models/users_model')

const router = express.Router()

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

router.route('/update/:username').patch((req, res) => {
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

router.route('/delete/:username').delete((req, res) => {

})



module.exports = router