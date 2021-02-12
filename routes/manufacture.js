const express = require('express')
const Manufacture = require('../models/manufacture.model')

const router = express.Router()


router.route("/man").get((req, res) => res.json
    ({
        status: "all manufacturers available"
    })

)

// post the details of manufacture

router.route('/manufactureDetails').post((req, res) => {
    const manufactures = new Manufacture({
        name: req.body.name,
        supplierNumber: req.body.supplierNumber,
        address: req.body.address,
    })
    manufactures
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

//get manufacture names from database

router.route("/manufactureNames").get((req, res) => {
    Manufacture.find((err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })

}
)

module.exports = router