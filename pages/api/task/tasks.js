import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task/Task';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'POST') {
    const task = req.body;

    const taskDoc = await Task.create(task);
    res.json(taskDoc);
  }
};

export default handle;
