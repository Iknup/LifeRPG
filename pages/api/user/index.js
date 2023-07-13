import connectDB from '@/lib/mongoose';
import { User } from '@/models/User';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'PATCH') {
    const userId = req.query.userId;
    console.log('user: ', userId, 'data: ', req.body);
    try {
      const user = await User.findOne({ _id: userId });
      user.section.push(req.body);

      const userDoc = await user.save();

      res.status(200).send(userDoc);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }


};

export default handle;
