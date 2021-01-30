const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Prescription = Schema({

    userID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    }],

    hospitalID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospitals',
        //required: true
    }],

    img: {
        type: String,
        default: "",
    }

})

module.exports = mongoose.model("Prescription", Prescription)