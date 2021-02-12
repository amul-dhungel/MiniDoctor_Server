const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Manufacture = Schema({

    name: {
        type: String,
        required: true,
    },
    supplierNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: false,
    },


})

module.exports = mongoose.model("Manufacture", Manufacture)