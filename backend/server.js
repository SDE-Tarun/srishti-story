const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const memoryRoutes = require("./routes/memoryRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/memories", memoryRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Srishti Story API is running ❤️",
    status: "success",
  });
});

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();