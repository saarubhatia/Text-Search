const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const NodeCache = require("node-cache");

const app = express();

const cache = new NodeCache({ stdTTL: 60 }); // Set the TTL (Time-To-Live) for cached items to 60 seconds

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

const documentSchema = new mongoose.Schema({
  name: String,
  author: String,
  date: Date,
  text: String,
});

// Create a document model
const Document = mongoose.model("Document", documentSchema);

// Search endpoint
app.get("/api/search", async (req, res) => {
  const { query } = req.query;

  try {
    // Check if the search results are already cached
    const cachedResults = cache.get(query);
    if (cachedResults) {
      console.log("Returning cached results for:", query);
      return res.json(cachedResults);
    }
    const documents = await Document.find(
      {
        $text: { $search: query },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .exec();

    // Cache the search results
    cache.set(query, documents);

    res.status(201).json(documents);
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "An error occurred" });
  }
});

// Add document endpoint
app.post("/api/documents", async (req, res) => {
  const { name, author, date, text } = req.body;

  try {
    const newDocument = new Document({ name, author, date, text });
    await newDocument.save();
    cache.flushAll();

    res.status(201).json({ message: "Document added successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "An error occurred" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
