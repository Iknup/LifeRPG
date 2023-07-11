import connectDB from '@/lib/mongoose';
import { SubTask } from '@/models/SubTask';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'POST') {
    try {
      const subTaskData = req.body;
      console.log('Received subtaskdata', subTaskData);

      const subTaskDoc = await SubTask.create(subTaskData);

      console.log('Created subtask', subTaskDoc);

      res.status(201).send(subTaskDoc);
    } catch (e) {
      console.error('error creating subtask:', e);
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
      console.log(subtasks);
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
