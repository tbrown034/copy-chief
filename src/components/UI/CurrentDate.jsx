import React from "react";

export default function CurrentDate() {
  // Create a new Date object that represents the current date and time
  let today = new Date();

  // Format the date into a readable string
  let dateString = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Return JSX that includes the formatted date string
  return <div className="  font-semibold">{dateString}</div>;
}
