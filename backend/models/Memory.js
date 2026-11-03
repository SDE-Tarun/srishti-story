const mongoose = require("mongoose");

const memorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Our Memories",
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Memory", memorySchema);