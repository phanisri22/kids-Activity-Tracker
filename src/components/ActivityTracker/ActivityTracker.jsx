import React, { useState, useEffect } from "react";
import "./ActivityTracker.css"; // Add appropriate styles

const ActivityTracker = () => {
  const [activities, setActivities] = useState([
    { id: 1, name: "Homework", status: "notDone", points: 0 },
    { id: 2, name: "Exercise", status: "notDone", points: 0 },
    { id: 3, name: "Reading", status: "notDone", points: 0 },
  ]);

  const [monthlyPoints, setMonthlyPoints] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const updateActivityStatus = (id) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) => {
        if (activity.id === id) {
          if (activity.status === "notDone") {
            return { ...activity, status: "done", points: 10 };
          } else {
            return { ...activity, status: "notDone", points: 0 };
          }
        }
        return activity;
      })
    );
  };

  const addMiscellaneousPoints = (id, additionalPoints) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id
          ? { ...activity, points: activity.points + additionalPoints }
          : activity
      )
    );
  };

  const calculateTotalPoints = () => {
    return activities.reduce((total, activity) => total + activity.points, 0);
  };

  const endDay = () => {
    const totalPoints = calculateTotalPoints();
    setMonthlyPoints((prevMonthlyPoints) => [
      ...prevMonthlyPoints,
      totalPoints,
    ]);
    setActivities((prevActivities) =>
      prevActivities.map((activity) => ({
        ...activity,
        status: "notDone",
        points: 0,
      }))
    );
  };

  const calculateMonthlyTotal = () => {
    return monthlyPoints.reduce((total, points) => total + points, 0);
  };

  useEffect(() => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    if (monthlyPoints.length >= daysInMonth) {
      alert(
        `Total points for ${currentDate.toLocaleString("default", {
          month: "long",
        })}: ${calculateMonthlyTotal()} points`
      );
      setMonthlyPoints([]); // Reset for the next month
    }
  }, [monthlyPoints, currentDate]);

  return (
    <div className="activity-tracker">
      <h1>Activity Tracker</h1>
      <div className="activity-list">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`activity-cell ${activity.status}`} // Correct className syntax
            onClick={() => updateActivityStatus(activity.id)}
          >
            <p>{activity.name}</p>
            <p>
              {activity.status === "done"
                ? `${activity.points} points`
                : "0 points"}
            </p>
          </div>
        ))}
      </div>
      <div className="miscellaneous">
        <h2>Add Miscellaneous Points</h2>
        {activities.map((activity) => (
          <div key={activity.id} className="miscellaneous-action">
            <p>{activity.name}</p>
            <button onClick={() => addMiscellaneousPoints(activity.id, 5)}>
              Add 5 Points
            </button>
          </div>
        ))}
      </div>
      <div className="cumulative-score">
        <h2>Cumulative Score of the Day</h2>
        <p>Total Points: {calculateTotalPoints()}</p>
        <button onClick={endDay}>End Day</button>
      </div>
      <div className="monthly-score">
        <h2>Monthly Cumulative Score</h2>
        <p>Total Monthly Points: {calculateMonthlyTotal()}</p>
        <ul>
          {monthlyPoints.map((points, index) => (
            <li key={index}>
              Day {index + 1}: {points} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityTracker;
