import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
<<<<<<< HEAD
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
=======
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [emailOrRoll, setEmailOrRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
    setNotif({ message: "", type: "" });
=======
    setError("");
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591

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
<<<<<<< HEAD
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
=======

      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", res.user.uid), {
          email: emailOrRoll,
          role,
        });

        await setDoc(doc(db, "roles", res.user.uid), {
          role,
        });
      }

      alert(`Login successful as ${role}`);
      if (role === "coordinator") {
        navigate("/coordinator");
      } else {
        navigate("/student");
      }

    } catch (loginErr) {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          email: emailOrRoll,
          role,
        });

        await setDoc(doc(db, "roles", res.user.uid), {
          role,
        });

        alert(`New user created and logged in as ${role}`);
        if (role === "coordinator") {
          navigate("/coordinator-dashboard");
        } else {
          navigate("/student-dashboard");
        }

      } catch (createErr) {
        console.error("Login failed:", createErr.message);
        setError("Login failed. Please check your credentials.");
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
      }
    }
  };

<<<<<<< HEAD
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
=======
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1000px",
        background: "linear-gradient(135deg, #6EE7B7, #3B82F6, #9333EA)",
        backgroundSize: "600% 600%",
        animation: "gradientMove 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientMove {
            0% {background-position:0% 50%;}
            50% {background-position:100% 50%;}
            100% {background-position:0% 50%;}
          }
        `}
      </style>

      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: "40px 30px",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          transform: "rotateX(5deg) rotateY(-5deg) translateZ(20px)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            color: "#1f2937",
            fontSize: "26px",
            fontWeight: "700",
            transform: "translateZ(10px)",
          }}
        >
          WELCOME
        </h2>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
          <input
            type="text"
            placeholder="Email or Roll Number"
            value={emailOrRoll}
            onChange={(e) => setEmailOrRoll(e.target.value)}
<<<<<<< HEAD
=======
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
              transform: "translateZ(5px)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
          />
          <input
            type="password"
            placeholder="Password / Roll Number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
          />
          <button type="submit">Enter</button>
        </form>
      </div>
      <Notification
        message={notif.message}
        type={notif.type}
        onClose={handleNotifClose}
      />
=======
            style={{
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
              transform: "translateZ(5px)",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "16px",
              transition: "0.3s",
              transform: "translateZ(5px)",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          >
            Login
          </button>
        </form>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "15px",
              fontSize: "14px",
              transform: "translateZ(5px)",
            }}
          >
            {error}
          </p>
        )}
      </div>
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
    </div>
  );
};

export default Login;
