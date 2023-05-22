import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb+srv://leesiyeol03:8dnViAfUBHnMdqfJ@cluster0.rcqcfe3.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Connected to MongoDB! ${connection.connection.host}`);
  } catch (e) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
