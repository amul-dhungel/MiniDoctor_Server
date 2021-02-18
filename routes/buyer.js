const express = require('express')
const Buyer = require('../models/buyer.model')
const Medicine = require('../models/medicine.model')
const middleware = require('../middleware')
const User = require('../models/users.model')
const router = express.Router()



// checking API
router.route("/buy").get((req, res) => res.json
    ({
        status: "Buy status ready"
    })

)

//get buyer names from database

router.route("/buyerNames").get((req, res) => {
    Medicine.find((err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })

})


// adding buyer details based on manufacture and disease id

router.route('/buyerDetails/:medicines').post(middleware.checkToken, async (req, res) => {
    const buyer = new Buyer({
        userID: await User.findOne({ phoneNumber: req.decoded.phoneNumber }).populate('userID').exec(),
        medicineID: await Medicine.find({ name: req.params.medicines.split(',') }).populate('medicineID').exec(),
        total: req.body.total,
    })
    buyer
        .save()
        .then((result) => {
            res.json({
                status: "Buyers added",
            })
            return result
        })
        .catch((err) => {
            return res.status(403).json({ msg: err })
        })
})




module.exports = router