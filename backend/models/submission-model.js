const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  doneStatus: { type: Boolean, default: false },
  totalAttempts: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 }, // in seconds
}, {
  timestamps: true // This will add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Submission', submissionSchema, 'submissions');
