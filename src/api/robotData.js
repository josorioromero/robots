let robots = []; // In-memory storage for robots

function addRobot(robot) {
  robots.push(robot);
}

function getRobots() {
  return robots;
}

module.exports = {
  addRobot,
  getRobots,
};
