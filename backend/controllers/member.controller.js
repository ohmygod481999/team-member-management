const Member = require('../models/member.model')
exports.getMember = (req, res) => {
    Member.find().then(members => {
        res.jsonp(members)
    }, e => res.status(400).send(e))
}

exports.addMember = (req, res) => {
    const member = new Member({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    })

    member.save().then(member => {
        res.send(member)
    }, e => {
        res.status(400).send(e)
    })
}

exports.updateMember = (req, res) => {

}