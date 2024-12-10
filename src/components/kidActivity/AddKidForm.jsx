import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddKidForm.css";

const AddKidForm = () => {
  const [kidName, setKidName] = useState("");
  const [avatar, setAvatar] = useState(null); // New state for avatar photo
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!kidName) {
      alert("Please enter a kid's name.");
      return;
    }
    if (!avatar) {
      alert("Please upload an avatar photo.");
      return;
    }
    alert("Kid added successfully!");
    navigate("/activityform");
  };

  // Handle the avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Create a URL for the selected image
    }
  };

  return (
    <div className="add-kid-form">
      <h1>Add Kid's Information</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Kid's Name"
          value={kidName}
          onChange={(e) => setKidName(e.target.value)}
          required
        />

        {/* Avatar upload input */}
        <input type="file" accept="image/*" onChange={handleAvatarChange} />

        {/* Display the selected avatar (if any) */}
        {avatar && (
          <img src={avatar} alt="Kid Avatar" className="avatar-preview" />
        )}

        <button type="submit">Add Kid</button>
      </form>
    </div>
  );
};

export default AddKidForm;
