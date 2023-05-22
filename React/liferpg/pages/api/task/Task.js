import connectDB from '@/lib/mongoose';
import {
  RPGTask,
  getRequiredExpForLevel,
  getPrevLevelExp,
} from '@/models/Task/Task';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'POST') {
    const { description, repeat } = req.body;
    const taskDoc = await RPGTask.create({
      description,
      repeat,
    });
    res.json(taskDoc);
  }
};

export default handle;
