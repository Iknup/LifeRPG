import connectDB from '@/lib/mongoose';
import { SubTask } from '@/models/SubTask';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();
  if (method === 'PATCH') {
    console.log('Subtask reset!');
    const taskId = req.query.parentId;

    try {
      const subtasks = await SubTask.updateMany(
        { parentTask: taskId, repeat: true },
        { isComplete: false }
      );

      res.send(subtasks);
    } catch (e) {
      console.log('Subtask reset error!:', e);
      res.status(500).send(e);
    }
  }
};

export default handle;
