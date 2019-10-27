const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const db = require('../utils/db')

const memberSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
    },
    fblink: {
        type: String
    },
    phonenumber: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    membership: {
        type: String
    },
    marcom: {
        type: String
    },
    library: {
        type: String
    },
    workshop: {
        type: String
    },
    ba: {
        type: String
    },
    translation: {
        type: String
    },
    mice: {
        type: String
    },
    education: {
        type: String
    },
    tech: {
        type: String
    },
    sa: {
        type: String
    },
    da: {
        type: String
    },
    vfd: {
        type: String
    },
    investup: {
        type: String
    },
    digicontent: {
        type: String
    },
    seo: {
        type: String
    },

})

const Member = mongoose.model('Member', memberSchema)

module.exports = Member