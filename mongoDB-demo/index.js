const mongoose = require('mongoose');
const { min, max } = require('underscore');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true,
        minlength: 5,
        maxlength: 255
     },
    category: {
        type: String,
        required : true,
        enum : ['web', 'mobile','network'],
        lowercase: true,

    },
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublish: Boolean,
    price:{
        type : Number,
        required: function (){
            return this.isPublish
        },
        min:10,
        max:200,
        getter : v => Math.round(v),
        set: v=> Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema); // Model

async function createCourse() {
    const course = new Course({
        name: "Nandu", 
        author: "N4",
        tags: ['Physics', 'backend'],
        isPublish: true,
        price: 15.8,
        category : 'Web'
    });

    try {
        const result = await course.save();
        console.log(result);
        // await course.validate() 
    } catch (ex) {
        // console.log(ex.message)
        for(field in ex.errors) // for multilple validation error
            console.log(ex.errors[field].message);
    }
}

createCourse();
