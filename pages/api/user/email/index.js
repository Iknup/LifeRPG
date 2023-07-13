import connectDB from '@/lib/mongoose';
import { User } from '@/models/User';

const handle = async (req, res) => {
  const { method } = req;
  const { email } = req.query;

  await connectDB();

  if (method === 'GET') {
    try {
      const user = await User.findOne({ email });
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  }
};

export default handle;
