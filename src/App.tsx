import React, { useState } from "react";
import Robot from "./components/robot";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useFetchRobots, useAddRobot } from "./queries/index";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [robotName, setRobotName] = useState<string>("");
  const [numberOfArms, setNumberOfArms] = useState<number>(2);
  const [hasBattery, setHasBattery] = useState<boolean>(false);
  const [robotType, setRobotType] = useState<string>("Basic");

  const { data: robots = [] } = useFetchRobots();
  const addRobotMutation = useAddRobot();

  const addRobot = () => {
    if (robotName.trim()) {
      const newRobot = {
        name: robotName,
        numberOfArms,
        hasBattery,
        type: robotType,
      };

      addRobotMutation.mutate(newRobot);
    }
  };

  return (
    <div className="app-container">
      <h1>Robot Manager</h1>
      <div className="form-container">
        <div className="input-group">
          <label>Robot Name:</label>
          <input
            type="text"
            placeholder="Robot name"
            value={robotName}
            onChange={(e) => setRobotName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Number of Arms:</label>
          <input
            type="number"
            placeholder="Number of Arms"
            value={numberOfArms}
            onChange={(e) => setNumberOfArms(Number(e.target.value))}
          />
        </div>
        <div className="input-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={hasBattery}
              onChange={() => setHasBattery(!hasBattery)}
            />
            Has Battery
          </label>
        </div>
        <div className="input-group">
          <label>Robot Type:</label>
          <select
            value={robotType}
            onChange={(e) => setRobotType(e.target.value)}
          >
            <option value="Basic">Basic</option>
            <option value="Advanced">Advanced</option>
            <option value="Custom">Custom</option>
          </select>
        </div>
        <button onClick={addRobot}>Add Robot</button>
      </div>
      <div className="list-container">
        <h2>Robot List</h2>
        <ul>
          {robots.map((robot, index) => (
            <Robot
              key={index}
              name={robot.name}
              numberOfArms={robot.numberOfArms}
              hasBattery={robot.hasBattery}
              type={robot.type}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
