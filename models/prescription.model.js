const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Prescription = Schema({

    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "",
    }

})

module.exports = mongoose.model("Prescription", Prescription)