import mongoose, { Schema, model, models } from 'mongoose';
import { getRequiredExpForLevel } from '../../utility/levelexp';

const TaskSchema = new Schema({
  description: {
    type: String,
    require: true,
  },
  isComplete: {
    type: Boolean,
    require: true,
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
      'daily',
      'weekly',
      'Every Weekdays',
      'Every selected day',
      'Monthly',
    ],
    default: 'none',
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
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
    type: [Number],
  },
});

class TaskClass {
  expHandler() {
    this.experience += 2;
    this.timeCompleted++;
    if (this.experience >= getRequiredExpForLevel(this.level)) {
      this.level++;
    }
  }

  setResetHandler() {
    const curReset = this.reset;
    const current = new Date();
    let nextReset;
    if (this.repeat === 'Daily') {
      nextReset = setResetDate(curReset, 0);
    }
    if (this.repeat === 'Weekly') {
      nextReset = setResetDate(curReset, 0, 7);
    }
    if (this.repeat === 'Every Weekdays') {
      if (current.getDay() === 0 || current.getDay() === 6) {
        nextReset = getNextResetDate(1);
      } else {
        nextReset = setResetDate(curReset, 0);
      }
    }
    if (this.repeat === 'Monthly') {
      nextReset = setResetDate(curReset, 1, 0);
    }
    if (this.repeat === 'Every selected day') {
      const day = current.getDay();
                                                         
    }
    return (this.reset = nextReset);
  }
}

TaskSchema.loadClass(TaskClass);

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };

const setResetDate = (date, resetMonth = 0, resetDay = 1, resetHour = 2) => {
  return new Date(
    date.getFullYear(),
    date.getMonth() + resetMonth,
    date.getDate() + resetDay,
    resetHour,
    0,
    0
  );
};

const getNextResetDate = (resetDay, resetHour = 2, resetMinute = 0) => {
  const now = new Date();
  const day = now.getDay();
  const daysUntilReset = (resetDay - day + 7) % 7;
  const nextReset = setResetDate(now, daysUntilReset, resetHour);
  return nextReset;
};
