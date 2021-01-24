const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Hospitals = Schema({

    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Hospitals', Hospitals)