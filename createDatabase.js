const MongoClient = require('mongodb').MongoClient;

async function connectToDatabase() {
  try {
    const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookMyShow';
    console.log(dbUrl);

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
