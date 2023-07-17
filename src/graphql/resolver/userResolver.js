import { User } from '@/models/User';
import { Section } from '@/models/Section';
import { Task } from '@/models/Task';

export const userResolver = {
  Query: {
    async user(_, args) {
      if (args.id) {
        return await User.findById(args.id);
      } else {
        return await User.findOne({ email: args.email });
      }
    },
  },
  User: {
    async sections(parents) {
      return await Section.find({ user: parents._id });
    },
    async tasks(parents) {
      return await Task.find({ user: parents._id });
    },
  },
};
