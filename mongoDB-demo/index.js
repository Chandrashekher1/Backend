const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDb ')
    )
    .catch(err => console.error('Could not connect to MongoDB...',err))

const courseSchema = new mongoose.Schema({
    name : String,
    author: String,
    tags : [String],
    date : {type: Date, default: Date.now},
    isPublish : Boolean,
})

const Course = mongoose.model('Course',courseSchema) // class
// intialize object

async function createCourse() {
    const course = new Course({
        name : "Nandu",
        author: "N4",
        tags: ['Physics','backend'],
        isPublish:true,
    })
    const result = await course.save()
}

createCourse()



// async function getCourses() {
//     const courses = await Course
//     .find({author: 'CP',isPublish :true})
//     .limit(10)
//     .sort({name:1})
//     .select({name:1,tags:1})
    
//     console.log(courses);
// }

// getCourses()
