import { SubTask } from '@/models/SubTask';
import { Task } from '@/models/Task';

export const taskResolver = {
  Query: {
    async task(_, { id }) {
      return await Task.findById(id);
    },
    async tasks(_, { id }) {
      return await Task.find({ user: id });
    },
  },
  Task: {
    async subtasks(parent) {
      return await SubTask.find({ task: parent._id });
    },
  },
};
