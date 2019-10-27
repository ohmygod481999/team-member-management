const Department = require('../models/department.model')
const Member = require('../models/member.model')
const path = require('path');

exports.addMember = (req, res) => {

}

// Create Department
exports.createDepartment = (req, res) => {
    const department = new Department({
        name: req.body.name,
        members: req.body.members
    })

    department.save()
        .then(department => {
            res.send(department)
        }, e => {
            res.status(400).send(e)
        })

}

exports.create = department =>  {
    const newDepartment = new Department({department})
    return newDepartment.save()
}

exports.updateMembersDepartment = function(req, res) {
    const department = req.body.name

    let departmentName
    switch (department) {
        case "membership":
            departmentName = "Membership"
            break;
        case "marcom":
            departmentName = "Marcom"
            break;
        case "library":
            departmentName = "Library"
            break;
        case "workshop":
            departmentName = "Workshop"
            break;
        case "ba":
            departmentName = "Business Analyst"
            break;
        case "translation":
            departmentName = "Translation"
            break;
        case "mice":
            departmentName = "Mice"
            break;
        case "education":
            departmentName = "Education"
            break;
        case "tech":
            departmentName = "Technology"
            break;
        case "sa":
            departmentName = "Strategy Academy"
            break;
        case "da":
            departmentName = "Data Academy"
            break;
        case "vfd":
            departmentName = "Vietnam Film Development"
            break;
        case "investup":
            departmentName = "Invest Up"
            break;
        case "digicontent":
            departmentName = "Digital Content"
            break;
        case "seo":
            departmentName = "SEO"
            break;
        default:
            return res.send('Department not found')
    }
    
    Member.find().then(members => {
        const updatedMembers = []
        members.forEach(member => {
            if (member[department] == 'TRUE') updatedMembers.push(member._id)
        })
        Department.findOne({
            name: departmentName,
        }).then(department => {
            if (department == null) {
                const newDepartment = new Department({
                    name: departmentName,
                    members: updatedMembers
                })
                newDepartment.save()
                    .then(department => res.send(department))
                    .catch(e => res.status(400).send(e))
            }
            else {
                department.members = updatedMembers
                department.save()
                .then(result => res.send(result))
            }
        }, e => {
            res.status(400).send(e)
        })
        
        // res.send(techMembers)
    }, e => res.status(400).send(e))
}

exports.get = function(req, res){
    res.sendFile(path.resolve('views/department.html'))
}

// List all Department
exports.list = function(req, res){
    Department.find()
        .then(departments => res.send(departments))
}