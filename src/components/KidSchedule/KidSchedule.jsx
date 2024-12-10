import React, { useState } from "react";
import "./KidSchedule.css"; // You can style the component here

const KidSchedule = ({
  kid,
  schedule,
  activities,
  points,
  onCompleteActivity,
}) => {
  const [selectedDay, setSelectedDay] = useState("");

  const handleCompleteActivity = (day, time, activityId) => {
    if (!activityId) return;

    onCompleteActivity(day, time, activityId);
  };

  return (
    <div className="kid-schedule">
      <h2>{kid.name}'s Schedule</h2>

      {/* Select Day */}
      <select
        className="day-selector"
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
      >
        <option value="">Select a Day</option>
        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>

      {selectedDay && (
        <div className="day-schedule">
          <h3>{selectedDay}</h3>
          {["Morning", "Afternoon", "Evening"].map((time) => {
            const activityId = schedule[kid.id]?.[selectedDay]?.[time];
            const activity = activities.find(
              (activity) => activity.id === activityId
            );

            return (
              <div key={time} className="time-slot">
                <span className="time-label">{time}:</span>
                {activity ? (
                  <div className="activity-details">
                    <span>{activity.name}</span>
                    <button
                      className="complete-button"
                      onClick={() =>
                        handleCompleteActivity(selectedDay, time, activityId)
                      }
                    >
                      Complete +10
                    </button>
                  </div>
                ) : (
                  <span>No activity scheduled</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Display Kid's Points */}
      <div className="points">
        <h3>
          {kid.name}'s Points: {points[kid.id]}
        </h3>
      </div>
    </div>
  );
};

export default KidSchedule;
