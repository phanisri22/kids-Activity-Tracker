import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddKidForm.css";

const AddKidForm = () => {
  const [kids, setKids] = useState([]); // Store all kids
  const [kidName, setKidName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  // Handle kid addition
  const handleAddKid = (e) => {
    e.preventDefault();

    if (!kidName || !avatar) {
      alert("Please provide both name and avatar.");
      return;
    }

    const newKid = {
      id: Date.now(),
      name: kidName,
      avatar,
    };

    setKids((prevKids) => [...prevKids, newKid]); // Add the new kid to the list
    setKidName("");
    setAvatar(null);
  };

  // Handle navigating to Activity Scheduler
  const handleNavigateToScheduler = (kid) => {
    navigate("/activityscheduler", { state: { kid } });
  };

  // Handle the avatar selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="add-kid-form">
      <h1>Add Kid's Information</h1>
      <form onSubmit={handleAddKid}>
        <input
          type="text"
          placeholder="Enter Kid's Name"
          value={kidName}
          onChange={(e) => setKidName(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {avatar && (
          <img src={avatar} alt="Avatar Preview" className="avatar-preview" />
        )}
        <button type="submit">Add Kid</button>
      </form>

      {/* Display Kids */}
      <div className="kids-list">
        <h2>Kids</h2>
        {kids.map((kid) => (
          <div
            key={kid.id}
            className="kid-item"
            onClick={() => handleNavigateToScheduler(kid)}
          >
            <img
              src={kid.avatar}
              alt={`${kid.name}'s Avatar`}
              className="kid-avatar"
            />
            <span>{kid.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddKidForm;
