const express = require('express')
const bodyParser = require('body-parser')
const db = require('./utils/db')
const mongoose = require('mongoose')
const memberRoute = require('./routes/member.route')
const departmentRoute = require('./routes/department.route')
const applicationFormRoute = require('./routes/application-form.route')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())


mongoose.set('useCreateIndex', true);
  
app.use(cors())

app.get('/',function(req,res){
    res.sendFile('views/form.html',{root: __dirname})
})

memberRoute(app)
departmentRoute(app)
applicationFormRoute(app)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})