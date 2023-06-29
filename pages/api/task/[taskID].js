import connectDB from '@/lib/mongoose';
import { Task } from '@/models/Task';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'PATCH') {
    const { taskID: _id } = req.query;
    // find task by id
    const task = await Task.findOne({ _id });
    try {
      if (req.body.isEdit) {
        const { taskData } = req.body;
        task.description = taskData.description;
        task.experience = taskData.experience;
        task.isRPG = taskData.isRPG;
        task.level = taskData.level;
        task.repeat = taskData.repeat;
        task.selectedDays = taskData.selectedDays;

        const taskDoc = await task.save();
        res.send(taskDoc);
      } else {
        const { isComplete } = req.body;

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
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }

  if (method === 'DELETE') {
    const { taskID: _id } = req.query;

    try {
      const task = await Task.findOneAndDelete({ _id });
      res.send(task);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};

export default handle;
