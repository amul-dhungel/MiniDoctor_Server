const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Medicine = Schema({

    name: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    scheduleTime: {
        type: String,
        required: true,
    },

    diseaseID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease',
        //required: true
    }],

    manufactureID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacture',
        //required: true
    }],

})

module.exports = mongoose.model("Medicine", Medicine)