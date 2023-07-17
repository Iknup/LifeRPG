import mongoose, { Schema } from 'mongoose';

const SectionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  
});

let Section;

try {
  Section = mongoose.model('Section');
} catch (e) {
  Section = mongoose.model('Section', SectionSchema);
}

module.exports = { Section };
