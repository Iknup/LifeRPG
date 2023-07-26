import mongoose, { Schema } from 'mongoose';

const timezoneSchema = new Schema({
  timezoneString: { type: String },
  offset: { type: Number },
});

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  timezone: {
    type: timezoneSchema,
  },
  resetSchedule: {
    type: Number,
    default: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

module.exports = { User };
