import connectDB from '@/lib/mongoose';
import { SubTask } from '@/models/SubTask';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'POST') {
    try {
      const subTask = req.body;

      const subTaskDoc = await SubTask.create(subTask);

      res.send(subTaskDoc);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }

  if (method === 'GET') {
    const parentId = req.query.parentId;

    try {
      const subtasks = await SubTask.find({ parentTask: parentId });

      if (!subtasks) {
        throw new Error('No subtask found!');
      }

      res.send(subtasks);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  if (method === 'PATCH') {
    const parentId = req.query.parentId;

    try {
      const subtasks = await SubTask.find({ parentTask: parentId });
      subtasks.forEach(subtask => (subtask.isComplete = false));

      subtasks.save();
    } catch (e) {
      res.status(500).send(e);
    }
  }

  if (method === 'DELETE') {
    const subtaskId = req.query.subtaskId;

    try {
      const subtask = await SubTask.deleteOne({ _id: subtaskId });

      res.send(subtask);
    } catch (e) {}
  }
};

export default handle;
