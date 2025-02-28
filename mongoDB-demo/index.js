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

// async function updateCourse(id) {
//     const course = await Course.findById(id)

//     if(!course) return
//     course.isPublish = true
//     course.author = 'CP03'

//     const result = await course.save()
//     console.log(result);
// }

// updateCourse('67bec11b282fc1c1324e1bd2')

async function removeDocument(id) {
    // const result = await Course.deleteMany({_id:id})
    const result = await Course.findByIdAndDelete(id)

    console.log(result);
}

removeDocument('67bec11b282fc1c1324e1bd2')

