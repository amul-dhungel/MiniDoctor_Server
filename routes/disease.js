const express = require('express')
const Disease = require('../models/disease.model')

const router = express.Router()


router.route("/dis").get((req, res) => res.json
    ({
        status: "all diseases fine"
    })

)

// post the details of diseases

router.route('/diseaseDetails').post((req, res) => {
    const diseases = new Disease({
        name: req.body.name,
        description: req.body.description,
        generic: req.body.generic,
        usage: req.body.usage
    })
    diseases
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

//get diseases names from database

router.route("/diseaseNames").get((req, res) => {
    Disease.find((err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })

}
)

module.exports = router