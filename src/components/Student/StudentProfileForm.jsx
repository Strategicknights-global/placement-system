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
    });
    return () => unsubscribe();
  }, []);

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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    } catch (error) {
      console.error("Error saving profile:", error.message);
      alert("Failed to save profile.");
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="page-wrapper">
      <form className="student-profile-form" onSubmit={handleSubmit}>
        <h2>Student Profile</h2>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key}>
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              id={key}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={`Enter ${key
                .replace(/([A-Z])/g, " ")
                .toLowerCase()}`}
              className="form-input"
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default StudentProfileForm;
