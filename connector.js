const express = require("express");
const router = express.Router();
const connectToDatabase = require("./createDatabase.js");
const { ObjectId } = require("mongodb");

router.get("/", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const dbo = client.db("bookMyShow");
    const result = await dbo
      .collection("bookings")
      .find(
        {},
        { projection: { MovieName: 1, MovieTime: 1, seats: 1, _id: 1 } }
      )
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const dbo = client.db("bookMyShow");
    const result = await dbo.collection("bookings").insertOne(req.body);
    console.log(result);

    res.status(201).json({ message: "created" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  
  try {
    const client = await connectToDatabase();
    const dbo = client.db("bookMyShow");

    // Use ObjectID to convert the string ID to a MongoDB ObjectID
    const objectId = new ObjectId(req.params.id);

    // Update the booking by ID
    const result = await dbo.collection("bookings").updateOne(
      { _id: objectId },
      { $set: req.body }
    );

    if (result.modifiedCount === 1) {
      console.log('Booking updated successfully');
      res.status(200).json({ message: "Booking updated successfully" });
    } else {
      console.log('Booking not found');
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




router.delete("/:id", async (req, res) => {
  try {
    const client = await connectToDatabase();
    const dbo = client.db("bookMyShow");

    // Use ObjectID to convert the string ID to a MongoDB ObjectID
    const objectId = new ObjectId(req.params.id);

    // Delete the booking by ID
    const result = await dbo.collection("bookings").deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      console.log('Booking deleted successfully');
      res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      console.log('Booking not found');
      res.status(404).json({ error: "Booking not found" });
    }
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
