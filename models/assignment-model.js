const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  assignmentName: {
    type: String,
    required: [true, 'What is the name of the assignment?']
  },
  dateAssigned: {
    type: Date,
    required: [true, 'When is the assignment being assigned?']
  },
  dateDue: {
    type: Date,
    required: [true, 'When is the assignment due?']
  },
  subject: {
    type: Date,
    required: [true, 'What subject does the assignment belong to?']
  },
  assignmentType: {
    type: String,
    required: [true, 'What kind of assignment this?']
  },
  description: {
    type: String
  }
},
{
  timestamps: true
});

const AssignmentModel = mongoose.model('Assignment', assignentSchema);

module.exports = AssignmentModel;