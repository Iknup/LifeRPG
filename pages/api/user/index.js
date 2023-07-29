import connectDB from '@/lib/mongoose';
import { User } from '@/models/User';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'PATCH') {
    const userId = req.query.userId;
    const fieldsToUpdate = ['timezone', 'resetSchedule', 'createdAt'];

    let updateData = {};
    fieldsToUpdate.forEach(field => {
      if (req.body.hasOwnProperty(field)) {
        updateData[field] = req.body[field];
      }
    });

    try {
      const response = await User.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );

      res.status(200).send(response);
    } catch (e) {
      console.log('User patch error:', e);
      res.status(500).send(e);
    }
  }
};

export default handle;
