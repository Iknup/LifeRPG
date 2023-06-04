import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();
  const now = new Date();

  if (method === 'PATCH') {
    try {
      const taskNeedsResetUpdate = await Task.find({ reset: { $lte: now } });

      taskNeedsResetUpdate.forEach(async task => {
        task.timeGenerated++;
        task.setResetHandler();
        task.isComplete = false;
        await task.save();
      });

      res.json(taskNeedsResetUpdate);
    } catch (e) {
      console.error(e);
    }
  }
};

export default handle;
