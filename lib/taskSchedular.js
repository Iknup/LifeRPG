import { MongoClient } from 'mongodb';
import Task from '@/models/Task';

const uri = process.env.MONGODB_URI;

const customFunction = async event => {
  try {
    const taskId = event.fullDocument._id;

    const task = await Task.findById(taskId);

    task.setResetHandler();
    task.timeGenerated++;
    task.isComplete = false;
    if (task.hasSubTask) {
      await axios.patch(
        `${process.env.DOMAIN}/api/subtask/reset?parentId=${task._id}`
      );
    }
    await task.save();
  } catch (e) {
    console.error('Error reseting:', e);
  }
};

const createChangeStream = async () => {
  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();

    const collection = client.db('test').collection('tasks');
    const pipeline = [
      {
        $match: {
          $expr: { $lte: ['$reset', new Date()] },
        },
      },
    ];

    const options = { fullDocument: 'updateLookup' };
    const changeStream = collection.watch(pipeline, options);

    changeStream.on('change', event => {
      console.log('Task update:', event.fullDocument);
      customFunction(event);
    });
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
  }
};

module.exports = createChangeStream;
