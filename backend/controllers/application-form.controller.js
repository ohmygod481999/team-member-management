const ApplicationForm = require('../models/application-form.model')
const mailController = require('./mail.controller')
const path = require('path')

exports.renderForm = (req, res) => {
    res.sendFile(path.resolve('views/application-form.html'))
}

exports.create = (req, res) => {
    const applicationForm = new ApplicationForm({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        birthday: new Date(req.body.birthday),
        gender: req.body.gender,
        career: req.body.career,
        group: req.body.group
    })

    applicationForm.save()
        .then(applicationForm => res.send(applicationForm))
        .catch(e => res.status(400).send(e))
}

exports.list = (req,res) => {
    ApplicationForm.find()
        .then(data => res.jsonp(data))
}

exports.reject = async (req, res) =>  {
    const application = await ApplicationForm.findById(req.body.id)
    application.status = 'rejected'
    application.save().then(data => res.jsonp(data))
    // res.jsonp(application)
}

exports.accept = async (req, res) => {
    const application = await ApplicationForm.findById(req.body.id)
    application.status = 'accepted'
    application.save().then(data => res.jsonp(data))
}

