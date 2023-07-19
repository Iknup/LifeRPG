import connectDB from '@/lib/mongoose';
import axios from 'axios';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;
  const userId = req.query.userId;
  await connectDB();
  const now = new Date();

  if (method === 'PATCH') {
    try {
      const taskNeedsResetUpdate = await Task.find({
        user: userId,
        reset: { $lte: now },
      }).populate('user');

      if (taskNeedsResetUpdate) {
        taskNeedsResetUpdate.forEach(async task => {
          task.setResetHandler();
          task.timeGenerated++;
          task.isComplete = false;
          if (task.hasSubTask) {
            const res = await axios.patch(
              `${process.env.DOMAIN}/api/subtask/reset?parentId=${task._id}`
            );
          }
          await task.save();
        });
        res.json(taskNeedsResetUpdate);
      } else {
        res.json('Nothing to reset');
      }
    } catch (e) {
      console.error(e);
    }
  }
};

export default handle;
