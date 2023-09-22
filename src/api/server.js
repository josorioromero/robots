const express = require("express");
const cors = require("cors");
const robotData = require("./robotData");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/api/robots", (req, res) => {
  const robots = robotData.getRobots();
  res.json(robots);
});

app.post("/api/robots", (req, res) => {
  const newRobot = req.body;

  if (!newRobot.name || !newRobot.numberOfArms || !newRobot.hasBattery || !newRobot.type) {
    return res.status(400).json({ error: "Incomplete data" });
  }
  newRobot.id = Date.now();
  robotData.addRobot(newRobot);
  console.log("New Robot Added:", newRobot);
  res.json(newRobot);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});