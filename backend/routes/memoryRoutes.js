const express = require("express");
const router = express.Router();

const Memory = require("../models/Memory");

// Get all memories
router.get("/", async (req, res) => {
  try {
    const memories = await Memory.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      count: memories.length,
      memories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Add a new memory
router.post("/", async (req, res) => {
  try {
    const { title, description, date, imageUrl, category, order } = req.body;

    const memory = await Memory.create({
      title,
      description,
      date,
      imageUrl,
      category,
      order,
    });

    res.status(201).json({
      success: true,
      memory,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;