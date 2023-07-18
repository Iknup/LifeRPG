import connectDB from '@/lib/mongoose';
import { User } from '@/models/User';
import { Section } from '@/models/Section';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'POST') {
    const userId = req.query.userId;
    console.log('user: ', userId, 'data: ', req.body);
    const sectionData = req.body;
    try {
      const addedSection = await Section.create(sectionData);

      res.status(200).send(addedSection);
    } catch (e) {
      console.log('Add section error:', e);
      res.status(500).send(e);
    }
  }

  if (method === 'DELETE') {
    const sectionId = req.query.sectionId;

    try {
      const response = await Section.deleteOne({ _id: sectionId });
      console.log(response.deletedCount);
    } catch (e) {
      console.log('Delete section error:', e);
      res.status(500).send(e);
    }
  }
};

export default handle;
