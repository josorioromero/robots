import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders app with form and robot list", async () => {
  render(<App />);

  // Check if the form elements are rendered
  const robotNameInput = screen.getByPlaceholderText("Robot name");
  const numberOfArmsInput = screen.getByPlaceholderText("Number of Arms");
  const hasBatteryCheckbox = screen.getByText("Has Battery");
  const robotTypeSelect = screen.getByLabelText("Robot Type");
  const addRobotButton = screen.getByText("Add Robot");

  // Check if the robot list is initially empty
  expect(screen.queryByText("Robot List")).toBeInTheDocument();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();

  // Simulate adding a robot
  userEvent.type(robotNameInput, "Test Robot");
  userEvent.type(numberOfArmsInput, "3");
  userEvent.click(hasBatteryCheckbox);
  userEvent.selectOptions(robotTypeSelect, "Advanced");
  userEvent.click(addRobotButton);

  // Wait for the robot to appear in the list
  await waitFor(() => {
    expect(screen.getByText("Robot List")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText("Test Robot")).toBeInTheDocument();
  });
});
