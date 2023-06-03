import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'POST') {
    try {
      const task = req.body;

      const taskDoc = await Task.create(task);
      console.log(taskDoc);
      res.json(taskDoc);
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }

  if (method === 'GET') {
    const { sectionName } = req.query;

    try {
      let tasks;

      if (sectionName === 'overall') {
        tasks = await Task.find();
      } else {
        tasks = await Task.find({ section: sectionName });
      }

      res.json(tasks);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};

export default handle;
