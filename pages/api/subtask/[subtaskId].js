import connectDB from '@/lib/mongoose';
import { SubTask } from '@/models/SubTask';

const handle = async (req, res) => {
  const { method } = req;

  await connectDB();
  if (method === 'PATCH') {
    const taskId = req.query.subtaskId;

    try {
      const subtaskData = req.body;

      const subtask = await SubTask.findOne({ _id: taskId });

      const fieldsToUpdate = ['title', 'isComplete', 'require', 'repeat'];

      fieldsToUpdate.forEach(field => {
        if (subtaskData.hasOwnProperty(field)) {
          subtask[field] = subtaskData[field];
        }
      });

      const subtaskDoc = await subtask.save();
      res.send(subtaskDoc);
    } catch (e) {
      res.status(500).send(e);
      console.log(e);
    }
  }
};

export default handle;
