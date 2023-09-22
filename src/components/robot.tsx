import React from "react";

interface RobotProps {
  name: string;
  numberOfArms: number;
  hasBattery: boolean;
  type: string;
}

const Robot: React.FC<RobotProps> = ({ name, numberOfArms, hasBattery, type }) => {
  return (
    <li>
      <strong>Name:</strong> {name}, <strong>Arms:</strong> {numberOfArms},{" "}
      <strong>Has Battery:</strong> {hasBattery ? "Yes" : "No"}, <strong>Type:</strong> {type}
    </li>
  );
};

export default Robot;