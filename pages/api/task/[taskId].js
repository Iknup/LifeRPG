import connectDB from '@/lib/mongoose';
import { addDays } from 'date-fns';
import { Task } from '@/models/Task';
import { REPEAT_ENUM } from '@/utility/ENUM';
import { SubTask } from '@/models/SubTask';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();

  if (method === 'PATCH') {
    const { taskId } = req.query;
    // find task by id
    try {
      const task = await Task.findOne({ _id: taskId });

      if (req.body.isEdit) {
        const { taskData } = req.body;
        const fieldsToUpdate = [
          'description',
          'experience',
          'isRPG',
          'level',
          'repeat',
          'selectedDays',
          'hasSubTask',
          'section',
        ];

        fieldsToUpdate.forEach(field => {
          if (taskData.hasOwnProperty(field)) {
            task[field] = taskData[field];
          }
        });

        const taskDoc = await task.save();
        res.send(taskDoc);
      } else {
        const { isComplete } = req.body.taskData;

        // task: isComplete: false isRPG: true
        // check isRPG
        // console.log('before', task);
        if (task.isRPG) {
          task.rpgClearHandler(isComplete);
        }

        if (task.repeat === REPEAT_ENUM.NONE) {
          if (!task.expireDate) {
            task.expireDate = addDays(new Date(), 7);
          } else {
            task.expireDate = undefined;
          }
        }
        // switch isComplete
        task.isComplete = !isComplete;
        const taskDoc = await task.save();
        res.send(taskDoc);
      }
    } catch (e) {
      console.log('Edit error:', e);
      res.status(500).send(e);
    }
  }

  if (method === 'DELETE') {
    const { taskId: _id } = req.query;

    try {
      const task = await Task.findById({ _id });

      if (task.hasSubTask) {
        await SubTask.deleteMany({ parentTask: _id });
      }

      const response = await Task.findByIdAndDelete(_id);
      res.send(response);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};

export default handle;
