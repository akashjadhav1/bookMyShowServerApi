const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./createDatabase');
const bookingRoutes = require('./connector');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Connect to the MongoDB database
connectToDatabase()
  .then(() => {
    console.log('Connected to the MongoDB database');

    // Use the booking routes
    app.use('/bookings', bookingRoutes);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1); // Exit the process if the database connection fails
  });
