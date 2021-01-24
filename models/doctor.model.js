const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Doctors = Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },

    hospitalID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hospitals',
        //required: true
    }]

})

module.exports = mongoose.model('Doctors', Doctors)