const applicationFormController = require('../controllers/application-form.controller')

module.exports = function(app) {
    app.route('/dang-ky')
        .get(applicationFormController.renderForm)

    app.route('/apply')
        .post(applicationFormController.create)

    app.route('/list')
        .get(applicationFormController.list)

    app.route('/reject')
        .post(applicationFormController.reject)

    app.route('/accept')
        .post(applicationFormController.accept)
}