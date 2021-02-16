const express = require('express')
const Medicine = require('../models/medicine.model')
const Manufacture = require('../models/manufacture.model')
const Disease = require('../models/disease.model')
const router = express.Router()



// checking API
router.route("/med").get((req, res) => res.json
    ({
        status: "Medicine details ready"
    })

)

//get medicines names from database

router.route("/medicineNames").get((req, res) => {
    Medicine.find((err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })

})


// adding medicine details based on manufacture and disease id

router.route('/medicineDetails/:disease/:manufacture').post(async (req, res) => {
    const medicine = new Medicine({
        name: req.body.name,
        price: req.body.price,
        scheduleTime: req.body.scheduleTime,
        diseaseID: await Disease.find({ name: req.params.disease }).populate('diseaseID').exec(),
        manufactureID: await Manufacture.find({ name: req.params.manufacture }).populate('manufactureID').exec(),
    })
    medicine
        .save()
        .then((result) => {
            res.json({
                status: "Medicine added",
            })
            return result
        })
        .catch((err) => {
            return res.status(403).json({ msg: err })
            // return result
        })
})


//get disease name of specific medicines from database

router.route("/diseaseOfMedicine/:diseaseID").get((req, res) => {
    // Medicine.find((err, result) => {
    //     if (err) return res.json({ err: err })
    //     if (result == null) return res.json({ data: [] })
    //     else return res.json({ data: result })
    // })
    Disease.findById(req.params.diseaseID, req.params.manufactureID, (err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })
})

// get manufacture name of specific disease from database

router.route("/manufactureOfMedicine/:manufactureID").get((req, res) => {
    Manufacture.findById(req.params.manufactureID, (err, result) => {
        if (err) return res.json({ err: err })
        if (result == null) return res.json({ data: [] })
        else return res.json({ data: result })
    })
})

module.exports = router