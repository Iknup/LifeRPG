import mongoose, { Schema } from 'mongoose';
import { TaskClass } from '@/classes/TaskClass';

const TaskSchema = new Schema({
  description: {
    type: String,
    require: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isRPG: {
    type: Boolean,
  },
  repeat: {
    type: String,
    enum: [
      'None',
      'Daily',
      'Weekly',
      'Every Weekdays',
      'Every selected day',
      'Monthly',
    ],
    default: 'None',
  },
  level: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  timeCompleted: {
    type: Number,
    default: 0,
  },
  timeGenerated: {
    type: Number,
    default: 1,
  },
  reset: {
    type: Date,
  },
  selectedDays: {
    type: [],
  },
});

TaskSchema.loadClass(TaskClass);

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };