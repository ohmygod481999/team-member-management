const mongoose = require('mongoose')

const dbURI = 'mongodb://localhost:27017/member-management-system'
const dbName = 'member-management-system';

const conn = mongoose.connect(
    dbURI, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }, error => {
        if (error){
            console.log("Error: " + error)
        }
        else {
            console.log("Connected successfully to server")
        }
    }
)

module.exports = conn;