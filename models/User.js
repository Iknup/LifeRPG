import mongoose, { Schema } from 'mongoose';

const SectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
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
  section: {
    type: [SectionSchema],
  },
});

let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

module.exports = { User };
