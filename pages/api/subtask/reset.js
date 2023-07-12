import connectDB from '@/lib/mongoose';
import { SubTask } from '@/models/SubTask';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();
  if (method === 'PATCH') {
    const taskId = req.query.taskId;

    try {
      const subtasks = await SubTask.find({ parentTask: taskId, repeat: true });

      subtasks.forEach(subtask => {
        subtask.isComplete = false;
      });

      const subtaskDoc = await subtasks.save();
      res.send(subtaskDoc);
    } catch (e) {
      res.status(500).send(e);
      console.log(e);
    }
  }
};

export default handle;
