import connectDB from '@/lib/mongoose';
import { Section } from '@/models/Section';

const handle = async (req, res) => {
  const { method } = req;
  await connectDB();

  if (method === 'GET') {
    const userId = req.query.userId;
    try {
      const sections = await Section.find({ user: userId });

      res.send(sections);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  if (method === 'PATCH') {
    const sectionId = req.query.sectionId;
    try {
      const response = await Section.updateOne(
        { _id: sectionId },
        { title: req.body.title }
      );

      if (response.modifiedCount === 1) {
        res.send({ _id: sectionId, title: req.body.title });
      } else {
        throw new Error('Error on update');
      }
    } catch (e) {
      console.log('Section Patch error:', e);
      res.status(500).send(e);
    }
  }

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

      res.status(200).send(response);
    } catch (e) {
      console.log('Delete section error:', e);
      res.status(500).send(e);
    }
  }
};

export default handle;
