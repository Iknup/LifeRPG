import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task/Task';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();
  const now = new Date();

  if (method === 'PATCH') {
    const taskNeedsResetUpdate = await Task.find({ reset: { $lte: now } });
    console.log(taskNeedsResetUpdate);

    res.json(taskNeedsResetUpdate);
  }
};

export default handle;
