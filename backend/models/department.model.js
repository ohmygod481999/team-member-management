const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    members: [
        {
            type: Schema.ObjectId,
            ref: 'Member'
        }
    ]
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department