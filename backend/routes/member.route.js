const memberController = require('../controllers/member.controller')
module.exports = function(app){
    app.route('/member')
    .get(memberController.getMember)
    .post(memberController.addMember)
}