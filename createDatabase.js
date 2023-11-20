const MongoClient = require('mongodb').MongoClient;

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect('mongodb://127.0.0.1:27017/bookMyShow', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

module.exports = connectToDatabase;
