import React, { useState, useEffect } from "react";
import "./App.css";

const ActivityScheduler = () => {
  const [kids, setKids] = useState([]);
  const [selectedKid, setSelectedKid] = useState(null);
  const [activities, setActivities] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [points, setPoints] = useState({});
  const [dailyPoints, setDailyPoints] = useState({});
  const [monthlyPoints, setMonthlyPoints] = useState([]);

  // Current date
  const currentDate = new Date();

  // UseEffect to handle end-of-month calculation
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
        })}: ${monthlyPoints.reduce((sum, mp) => sum + mp.points, 0)} points`
      );
      setMonthlyPoints([]); // Reset for the next month
    }
  }, [monthlyPoints, currentDate]);

  // Add a new kid
  const addKid = (name) => {
    const newKid = { id: Date.now(), name };
    setKids([...kids, newKid]);
    setPoints((prev) => ({ ...prev, [newKid.id]: 0 }));
  };

  // Add a new activity
  const addActivity = (activity) => {
    if (!selectedKid) return;
    setActivities((prev) => [...prev, { id: Date.now(), name: activity }]);
  };

  // Define a weekly schedule
  const updateSchedule = (day, time, activityId) => {
    setSchedule((prev) => ({
      ...prev,
      [selectedKid.id]: {
        ...(prev[selectedKid.id] || {}),
        [day]: {
          ...(prev[selectedKid.id]?.[day] || {}),
          [time]: { activityId, isDone: false, points: 0 },
        },
      },
    }));
  };

  // Freeze activity and assign points
  const freezeActivity = (day, time, isDone, pointsToAdd) => {
    if (!selectedKid) return;

    setSchedule((prev) => {
      const updatedDay = prev[selectedKid.id]?.[day] || {};
      updatedDay[time] = {
        ...updatedDay[time],
        isDone,
        points: isDone ? pointsToAdd : 0,
      };

      return {
        ...prev,
        [selectedKid.id]: {
          ...(prev[selectedKid.id] || {}),
          [day]: updatedDay,
        },
      };
    });

    // Update daily points
    const newPoints = points[selectedKid.id] + (isDone ? pointsToAdd : 0);
    setPoints((prev) => ({ ...prev, [selectedKid.id]: newPoints }));

    setDailyPoints((prev) => ({
      ...prev,
      [selectedKid.id]: newPoints,
    }));
  };

  // End the day
  const endDay = () => {
    if (!selectedKid) return;

    const dailyTotal = dailyPoints[selectedKid.id] || 0;
    setMonthlyPoints((prev) => [
      ...prev,
      { kidId: selectedKid.id, points: dailyTotal },
    ]);

    // Reset daily activities
    setSchedule((prev) => {
      const updatedSchedule = { ...prev[selectedKid.id] };

      Object.keys(updatedSchedule).forEach((day) => {
        Object.keys(updatedSchedule[day]).forEach((time) => {
          updatedSchedule[day][time] = {
            ...updatedSchedule[day][time],
            isDone: false,
            points: 0,
          };
        });
      });

      return { ...prev, [selectedKid.id]: updatedSchedule };
    });

    // Reset daily points
    setDailyPoints((prev) => ({ ...prev, [selectedKid.id]: 0 }));
  };

  return (
    <div className="activity-scheduler">
      <h1>Kid Activity Scheduler</h1>

      {/* Kids Section */}
      <div className="kids">
        <h2>Kids</h2>
        {kids.map((kid) => (
          <button
            key={kid.id}
            className="kid-button"
            onClick={() => {
              setSelectedKid(kid);
              setActivities([]); // Reset activities
            }}
          >
            {kid.name}
          </button>
        ))}
        <input
          type="text"
          className="input-box"
          placeholder="Add kid"
          onKeyDown={(e) => {
            if (e.key === "Enter") addKid(e.target.value);
          }}
        />
      </div>

      {/* Activities Section */}
      {selectedKid && (
        <div className="activities">
          <h2>Activities for {selectedKid.name}</h2>
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
      )}

      {/* Weekly Schedule */}
      {selectedKid && (
        <div className="schedule">
          <h2>Weekly Schedule</h2>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
            (day) => (
              <div key={day} className="day">
                <h3 className="day-title">{day}</h3>
                {["Morning", "Afternoon", "Evening"].map((time) => (
                  <div key={time} className="time-slot">
                    <span className="time-label">{time}:</span>
                    <select
                      className="dropdown"
                      onChange={(e) =>
                        updateSchedule(day, time, e.target.value)
                      }
                    >
                      <option value="">Select Activity</option>
                      {activities.map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="freeze-button"
                      onClick={() => freezeActivity(day, time, true, 10)}
                    >
                      Done +10
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {/* Dashboard Section */}
      <div className="dashboard">
        <h2>Summary Dashboard</h2>
        {kids.map((kid) => (
          <div key={kid.id} className="kid-summary">
            {kid.name}: {points[kid.id]} points
          </div>
        ))}
        <button onClick={endDay}>End Day</button>
        <h2>Monthly Dashboard</h2>
        <ul>
          {monthlyPoints
            .filter((mp) => mp.kidId === selectedKid?.id)
            .map((mp, index) => (
              <li key={index}>
                Day {index + 1}: {mp.points} points
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ActivityScheduler;
