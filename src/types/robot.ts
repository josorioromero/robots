interface Robot {
  id?: number; // Unique identifier for the robot
  name: string; // Name of the robot
  numberOfArms: number; // Number of arms the robot has
  hasBattery: boolean; // Indicates whether the robot has a battery
  type: string; // Type of the robot (e.g., "Basic", "Advanced", etc.)
}
