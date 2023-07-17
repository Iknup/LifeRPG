import { Section } from '@/models/Section';
import { Task } from '@/models/Task';

export const sectionResolver = {
  Query: {
    async sections(parent, args) {
      return await Section.find({ user: parent._id });
    },
  },
  Section: {
    async tasks(parent) {
      return await Task.find({ section: parent._id });
    },
  },
};
