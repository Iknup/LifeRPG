import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'PATCH') {
    const { taskID: _id } = req.query;
    const { isComplete } = req.body;

    try {
      // find task by id
      const task = await Task.findOne({ _id });
      // task: isComplete: false isRPG: true
      // check isRPG
      // console.log('before', task);
      if (task.isRPG) {
        task.rpgClearHandler(isComplete);
      }
      // switch isComplete
      task.isComplete = !isComplete;
      // console.log('after', task);
      const taskDoc = await task.save();
      res.send(taskDoc);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};

export default handle;
