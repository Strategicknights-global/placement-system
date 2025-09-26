<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import "./StudentProfileForm.css";

const StudentProfileForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    className: "",
    department: "",
    course: "",
    semester: "",
    cgpa: "",
    tenthMarks: "",
    twelfthMarks: "",
    gap: "",
    arrears: "",
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 Loading state for profile fetch

  // 🔹 Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
=======
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import './StudentProfileForm.css';

const StudentProfileForm = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    className: '',
    department: '',
    course: '',
    semester: '',
    cgpa: '',
    tenthMarks: '',
    twelfthMarks: '',
    gap: '',
    arrears: ''
  });

  const [user, setUser] = useState(null);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      }
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
    });
    return () => unsubscribe();
  }, []);

<<<<<<< HEAD
  // 🔹 Fetch existing profile if it exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const profileRef = doc(db, "profiles", user.uid);
          const profileSnap = await getDoc(profileRef);
          if (profileSnap.exists()) {
            setFormData(profileSnap.data()); // Pre-fill form
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  // 🔹 Handle input change
=======
  // Check if profile already exists
  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const profileRef = doc(db, 'profiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          onComplete(); // Skip form if profile exists
        }
      }
    };
    checkProfile();
  }, [user, onComplete]);

>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

<<<<<<< HEAD
  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      await setDoc(doc(db, "profiles", user.uid), formData, { merge: true });
      alert("Profile saved successfully.");
      if (onComplete) onComplete(); // ✅ Make safe (optional callback)
=======
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await setDoc(doc(db, 'profiles', user.uid), formData);
      alert("Profile saved successfully.");
      onComplete();
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
    } catch (error) {
      console.error("Error saving profile:", error.message);
      alert("Failed to save profile.");
    }
  };

<<<<<<< HEAD
  if (loading) {
    return <p>Loading profile...</p>;
  }

=======
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
  return (
    <div className="page-wrapper">
      <form className="student-profile-form" onSubmit={handleSubmit}>
        <h2>Student Profile</h2>
<<<<<<< HEAD
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
=======
        {Object.entries(formData).map(([key]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
            </label>
            <input
              id={key}
              name={key}
<<<<<<< HEAD
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key
                .replace(/([A-Z])/g, " ")
                .toLowerCase()}`}
=======
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' ').toLowerCase()}`}
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
              className="form-input"
              required
            />
          </div>
        ))}
<<<<<<< HEAD
        <button type="submit" className="submit-btn">
          Save Profile
        </button>
=======
        <button type="submit" className="submit-btn">Save Profile</button>
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
      </form>
    </div>
  );
};

export default StudentProfileForm;
