import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./Login.css";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Notification component at top
function Notification({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`notification-banner ${type}`}>
      {message}
      <button className="close-btn" onClick={onClose}>
        OK
      </button>
    </div>
  );
}

const Login = () => {
  const [emailOrRoll, setEmailOrRoll] = useState("");
  const [password, setPassword] = useState("");
  const [notif, setNotif] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotif({ message: "", type: "" });

    let email = emailOrRoll;
    let role = "";

    if (!email.includes("@")) {
      email = `${email}@student.com`;
      role = "student";
    } else if (email.includes("coordinator")) {
      role = "coordinator";
    } else {
      role = "student";
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", res.user.uid), { email: emailOrRoll, role });
        await setDoc(doc(db, "roles", res.user.uid), { role });
      }
      setNotif({ message: `Login successful as ${role}`, type: "success" });
    } catch (loginErr) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), { email: emailOrRoll, role });
        await setDoc(doc(db, "roles", res.user.uid), { role });
        setNotif({ message: `New user created as ${role}`, type: "success" });
      } catch (createErr) {
        console.error("Login failed:", createErr.message);
        setNotif({ message: "Login failed. Check credentials.", type: "error" });
      }
    }
  };

  const handleNotifClose = () => {
    if (notif.message.includes("student")) navigate("/student");
    else if (notif.message.includes("coordinator")) navigate("/coordinator");
    setNotif({ message: "", type: "" });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email or Roll Number"
            value={emailOrRoll}
            onChange={(e) => setEmailOrRoll(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password / Roll Number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Enter</button>
        </form>
      </div>
      <Notification
        message={notif.message}
        type={notif.type}
        onClose={handleNotifClose}
      />
    </div>
  );
};

export default Login;
