const mongoose = require('mongoose');

// Require additional Models
const ClassModel = require('./class-model');

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  studentKeyCode: {
    type: String,
    required: true
  },
  subjectsTaught: {
    type: Array,
    default: [],
    required: true
  },
  classesTaught {
    type: number
  },
  class: ClassModel.schema
},
{
  timestamps: true
});


const TeacherModel = mongoose.model('Teacher', teacherSchema);
// Collection name
// User -> users -> db.users.find()

module.exports = TeacherModel;
// Connects the  model above to the routes file