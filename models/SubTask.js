import mongoose, { Schema } from 'mongoose';

const SubTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentTask: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
});

let SubTask;

try {
  SubTask = mongoose.model('SubTask');
} catch (e) {
  SubTask = mongoose.model('SubTask', SubTaskSchema);
}

export { SubTask };
