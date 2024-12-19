import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

const ActivityScheduler = () => {
  const location = useLocation();
  const selectedKid = location.state?.kid;

  const [activities, setActivities] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [points, setPoints] = useState(0);
  const [dailyPoints, setDailyPoints] = useState(0);
  const [weeklyPoints, setWeeklyPoints] = useState({});
  const [monthlyPoints, setMonthlyPoints] = useState([]);
  const [lastEndedDay, setLastEndedDay] = useState(null); // Track the last day ended

  const currentDate = new Date();
  const today = currentDate.toDateString();

  // Prevent multiple end day actions for the same day
  const isTodayEnded = lastEndedDay === today;

  useEffect(() => {
    const totalMonthlyPoints = monthlyPoints.reduce(
      (sum, mp) => sum + mp.points,
      0
    );
    console.log(`Monthly total: ${totalMonthlyPoints} points`);
  }, [monthlyPoints]);

  if (!selectedKid) {
    return <p>No kid selected. Please return to the Add Kid form.</p>;
  }

  // Add a new activity
  const addActivity = (activity) => {
    setActivities((prev) => [...prev, { id: Date.now(), name: activity }]);
  };

  // Define a weekly schedule
  const updateSchedule = (day, time, activityId) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [time]: { activityId, isDone: false, points: 0 },
      },
    }));
  };

  // Freeze activity and assign points
  const freezeActivity = (day, time, isDone, pointsToAdd) => {
    setSchedule((prev) => {
      const updatedDay = prev[day] || {};
      updatedDay[time] = {
        ...updatedDay[time],
        isDone,
        points: isDone ? pointsToAdd : 0,
      };

      return {
        ...prev,
        [day]: updatedDay,
      };
    });

    setPoints((prev) => prev + (isDone ? pointsToAdd : 0));
    setDailyPoints((prev) => prev + (isDone ? pointsToAdd : 0));

    setWeeklyPoints((prev) => ({
      ...prev,
      [day]: (prev[day] || 0) + (isDone ? pointsToAdd : 0),
    }));
  };

  // End the day with confirmation
  const endDay = () => {
    if (isTodayEnded) {
      alert("You have already ended the day!");
      return;
    }

    const confirmEnd = window.confirm("Are you sure you want to end the day?");
    if (confirmEnd) {
      setMonthlyPoints((prev) => [
        ...prev,
        { kidId: selectedKid.id, day: today, points: dailyPoints },
      ]);

      setLastEndedDay(today); // Record the day as ended
      setDailyPoints(0); // Reset daily points
    }
  };

  return (
    <div className="activity-scheduler">
      <h1>Activity Scheduler for {selectedKid.name}</h1>
      <img
        src={selectedKid.avatar}
        alt={`${selectedKid.name}'s Avatar`}
        className="kid-avatar-large"
      />

      {/* Activities Section */}
      <div className="activities">
        <h2>Activities</h2>
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            {activity.name}
          </div>
        ))}
        <input
          type="text"
          className="input-box"
          placeholder="Add activity"
          onKeyDown={(e) => {
            if (e.key === "Enter") addActivity(e.target.value);
          }}
        />
      </div>

      {/* Weekly Schedule */}
      <div className="schedule">
        <h2>Weekly Schedule</h2>
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <div key={day} className="day">
            <h3>{day}</h3>
            {["Morning", "Afternoon", "Evening"].map((time) => (
              <div key={time} className="time-slot">
                <span>{time}:</span>
                <select
                  onChange={(e) => updateSchedule(day, time, e.target.value)}
                >
                  <option value="">Select Activity</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => freezeActivity(day, time, true, 10)}>
                  Done +10
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Points Summary */}
      <div className="points-summary">
        <h2>Points</h2>
        <p>Total Points: {points}</p>
        <button
          onClick={endDay}
          disabled={isTodayEnded} // Disable the button if today's end day is already recorded
        >
          End Day
        </button>
      </div>

      {/* Weekly Dashboard */}
      <div className="dashboard weekly-dashboard">
        <h2>Weekly Dashboard</h2>
        {Object.entries(weeklyPoints).map(([day, points]) => (
          <p key={day}>
            {day}: {points} points
          </p>
        ))}
      </div>

      {/* Monthly Dashboard */}
      <div className="dashboard monthly-dashboard">
        <h2>Monthly Dashboard</h2>
        <ul>
          {monthlyPoints.map((mp, index) => (
            <li key={index}>
              Day {mp.day}: {mp.points} points
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityScheduler;
