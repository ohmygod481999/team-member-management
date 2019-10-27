const express = require('express')
const fs = require('fs')
const https = require('https')

const path = require('path')
const bodyParser = require('body-parser')
const db = require('./utils/db')
const mongoose = require('mongoose')
const memberRoute = require('./routes/member.route')
const departmentRoute = require('./routes/department.route')
const applicationFormRoute = require('./routes/application-form.route')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express()
const dbConnection = db()
const PORT = process.env.PORT || 5000;

// const privateKey = fs.readFileSync('server.key')
// const certificate = fs.readFileSync('server.cert')


app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())


mongoose.set('useCreateIndex', true);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'})

app.use(cors())
app.use(helmet())
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/',function(req,res){
    res.sendFile('views/form.html',{root: __dirname})
})

memberRoute(app)
departmentRoute(app)
applicationFormRoute(app)

// https.createServer({key: privateKey, cert: certificate}, app)
//     .listen(PORT)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})