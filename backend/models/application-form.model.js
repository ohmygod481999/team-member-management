const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationFormSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    career: {
        type: String,
    },
    group: {
        type: String
    },
    status: {
        type: String,
        default: 'created',
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }

})

const ApplicationForm = mongoose.model('ApplicationForm', applicationFormSchema)

module.exports = ApplicationForm