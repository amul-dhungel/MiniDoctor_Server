const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Disease = Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    generic: {
        type: String,
        required: false,
    },
    usage: {
        type: String,
        required: true
    },


})

module.exports = mongoose.model("Disease", Disease)