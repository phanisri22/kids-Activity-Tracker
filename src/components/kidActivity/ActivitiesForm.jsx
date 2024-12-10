import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ActivitiesForm.css";

const ActivitiesForm = () => {
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const navigate = useNavigate(); // Initialize navigation


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activityName) {
      alert("Activity name is required.");
      return;
    }
    alert("Activity added successfully!");
    navigate("/activityscheduler");
  };
  
  return (
    <div className="activities-form">
      <h2>Create Activity</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activityName">Activity Name</label>
          <input
            type="text"
            id="activityName"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            placeholder="e.g., Dancing"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="activityDescription">Activity Description</label>
          <textarea
            id="activityDescription"
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            placeholder="Describe the activity"
            required
          />
        </div>
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
};

export default ActivitiesForm;
