import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import AddKidForm from "./components/kidActivity/AddKidForm";
import ActivityScheduler from "./components/ActivitySChedul/ActivityScheduler";

const db = getDatabase(app);

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/addkid" element={<AddKidForm />} />
          <Route path="/activityscheduler" element={<ActivityScheduler />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
