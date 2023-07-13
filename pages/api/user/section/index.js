import connectDB from '@/lib/mongoose';
import { User } from '@/models/User';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'DELETE') {
    if (req.query.sectionId) {
      try {
        const sectionId = req.query.sectionId;
        const userId = req.query.userId;

        const user = await User.findOne({ _id: userId });

        user.section = user.section.filter(
          section => section._id !== sectionId
        );

        const userDoc = user.save();
        res.status(200).send(userDoc);
      } catch (e) {
        console.log('section error:', e);
        res.status(500).send(e);
      }
    }
  }
};

export default handle;
