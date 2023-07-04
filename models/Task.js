import connectDB from '@/lib/mongoose';
import mongoose, { Schema } from 'mongoose';
import { TaskClass } from '@/classes/TaskClass';
import { REPEAT_ENUM } from '@/utility/ENUM';

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
    default: 0,
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
  selectedDate: {
    type: Date,
  },
  section: {
    type: String,
    default: 'user_data_name',
  },
  deleteDate: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

TaskSchema.loadClass(TaskClass);

let Task;

try {
  Task = mongoose.model('Task');
} catch (e) {
  Task = mongoose.model('Task', TaskSchema);
}

TaskSchema.pre('create', function (next) {
  try {
    if (this.repeat === REPEAT_ENUM.MONTHLY) {
      if (this.selectedDays.length > 1) {
        throw new Error();
      }
    }

    next();
  } catch (e) {
    res.status(400).send({ error: 'Monthly repeat can only have 1 date' });
  }
});

module.exports = { Task };
