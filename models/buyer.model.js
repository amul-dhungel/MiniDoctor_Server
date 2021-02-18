const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Buyer = Schema({

    userID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        //required: true
    }],

    medicineID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medicine',
        //required: true
    }],

    total: {
        type: String,
    }

})

module.exports = mongoose.model("Buyer", Buyer)