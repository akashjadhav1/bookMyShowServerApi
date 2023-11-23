const MongoClient = require('mongodb').MongoClient;

async function connectToDatabase() {
  try {
    const dbUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookMyShow';

    if (!dbUrl.startsWith('mongodb://') && !dbUrl.startsWith('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI scheme. It should start with "mongodb://" or "mongodb+srv://".');
    }

    const client = await MongoClient.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Optionally, you can return the MongoDB client object if needed
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
