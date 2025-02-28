const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/courses", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("Connected to MongoDB..."))
.catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String, 
    tags: [String],
    isPublish: Boolean,
    date: { type: Date, default: Date.now }
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    const course = await Course.find({ isPublish: true, tags: "backend" })
        .sort({ name: 1 })
        .limit(10)
        .select({ name: 1, author: 1 })

    return course;
}

async function run() {
    const result = await getCourses();
    console.log(result);  
}

run();
