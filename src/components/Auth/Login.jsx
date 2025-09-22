import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const Login = () => {
  const [emailOrRoll, setEmailOrRoll] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

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
      }
    }
  };

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
          <input
            type="text"
            placeholder="Email or Roll Number"
            value={emailOrRoll}
            onChange={(e) => setEmailOrRoll(e.target.value)}
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
          <input
            type="password"
            placeholder="Password / Roll Number"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </div>
  );
};

export default Login;
