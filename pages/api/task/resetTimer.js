import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();
  const now = new Date();

  if (method === 'PATCH') {
    try {
      const taskNeedsResetUpdate = await Task.find({ reset: { $lte: now } });
      if (taskNeedsResetUpdate) {
        taskNeedsResetUpdate.forEach(async task => {
          task.setResetHandler();
          task.timeGenerated++;
          task.isComplete = false;
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
