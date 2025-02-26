const express = require('express')
const router = express.Router()

router.get('/api/courses', (req,res) => {
    res.send(courses)
})

router.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The courses not found")
    res.send(course)
})

router.post('/api/courses', (req,res) => {
    const schema = {
        name : Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema)    

    if(result.error){
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message)
        return
    }

    const course = {
        id : courses.length+1,
        name : req.body.name
    }
    courses.push(course)
    res.send(course)
})

router.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The courses not found")

    const schema = {
        name : Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema)    

    if(result.error){
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message)
        return
    }
    // update the course
    course.name = req.body.name
    res.send(course)
})

module.exports = router