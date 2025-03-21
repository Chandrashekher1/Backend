const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema] 
}))

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
    const course =  await Course.findById(courseId)
    course.authors.name = 'Mosh Hamedani'
    course.save()
}

async function addAuthor(courseId,author) {
    const course = await Course.findById(courseId)
    course.authors.push(author)
    course.save()
}

async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId)
    const author = course.authors.id(authorId)
    author.remove()
    course.save()
}
// updateAuthor('67cc6b53af5e7eaf6ab41754')

removeAuthor('67cc6e3e6f88d8d60b4eb72b', '67cc6f2bb05e986c3b4149f4')

// createCourse('Node Course',[
//     new Author({ name: 'Mosh' }),
//     new Author({name: 'John'})
//     ]
// );
