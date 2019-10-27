const departmentController = require('../controllers/department.controller')

module.exports = function(app){
    app.route('/department')
        .get(departmentController.get)

    app.route('/department/list')
        .get(departmentController.list)

    app.route('/department/create')
        .post(departmentController.createDepartment)

    app.route('/department/update')
        .post(departmentController.updateMembersDepartment)
}