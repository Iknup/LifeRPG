import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'POST') {
    try {
      const task = req.body;

      const taskDoc = await Task.create(task);
      res.json(taskDoc);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }

  if (method === 'GET') {
    const userId = req.query.userId;

    try {
      const tasks = await Task.find({
        user: userId,
        $or: [
          { expireDate: { $exists: false } },
          { expireDate: { $gte: new Date() } },
        ],
      }).populate('user');
      res.json(tasks);
    } catch (e) {
      console.log('Task Get Error!:', e);
      res.status(500).send(e);
    }
  }
};

export default handle;
