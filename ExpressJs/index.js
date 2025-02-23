const Joi = require('joi')
const express = require('express')
const logger = require('./logger')
const app = express()
const helmet = require('helmet')
const config = require('config')
const courses = require('./courses')
const startUpDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
app.use(express.json())
app.use(express.urlencoded())
app.use(logger) 
app.use(helmet())
app.set('view engine','pug')
app.set('views','./views') // default
app.use('/api/courses',courses)


// configuration
console.log('Application Name: ' + config.get('name'));


if(app.get('ENV') === 'development'){
    app.use(morgan('tiny'))
    console.log('Morgan enabled');
    
}

const courses = [
    {id : 1 , name: "course1" },
    {id : 2 , name: "course2" },
    {id : 3 , name: "course2" }
]

app.get('/', (req,res) => {
    res.render('index', {title : "Pug" , message: "Hello"})
})


const port = process.env.PORT || 3000 
app.listen(port, () => console.log(`Listening on port ${port}...`))