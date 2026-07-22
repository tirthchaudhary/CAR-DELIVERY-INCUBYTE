const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGO_URI;
    if (!connUri) {
      console.log('Warning: MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(connUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
