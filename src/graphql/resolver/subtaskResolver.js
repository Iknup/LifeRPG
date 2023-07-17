import { SubTask } from '@/models/SubTask';

export const subtaskResolver = {
  Query: {
    async subtasks(parent, arg) {
      await SubTask.find({ task: parent._id });
    },
  },
};
