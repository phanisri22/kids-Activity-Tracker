import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase";

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signupWithGoogle = () => {
    signInWithPopup(auth, googleProvider);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate("/addkid");
      } else {
        console.log("you are logged out");
        setUser(null);
      }
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve stored user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      // Navigate to AddKidForm on successful login
      navigate("/addkid");
    } else {
      alert("Invalid credentials or user not registered.");
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="wrapper">
      <div className="form-box login">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FaUser className="icon" />
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <a href="#" onClick={navigateToRegister}>
              Register
            </a>
            <br />
            or
            <br />
            <button onClick={signupWithGoogle}>sign in with google</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
