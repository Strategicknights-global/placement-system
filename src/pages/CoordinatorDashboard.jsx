import React, { useState } from "react";
import AddCompanyForm from "../components/Coordinator/AddCompanyForm";
<<<<<<< HEAD
import ViewCompanies from "../components/Coordinator/Viewcompanies";
import ViewAppliedStudents from "../components/Coordinator/ViewAppliedStudents";
=======
import ViewCompanies from "../components/Coordinator/ViewCompanies";
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import './CoordinatorDashboard.css';

const CoordinatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('add');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="coordinator-dashboard">
      <header className="coordinator-header">
        <h2>Coordinator Dashboard</h2>
        <nav className="coordinator-nav">
          <button
            className={activeTab === 'add' ? 'active' : ''}
            onClick={() => setActiveTab('add')}
          >
            Add Company
          </button>
          <button
            className={activeTab === 'view' ? 'active' : ''}
            onClick={() => setActiveTab('view')}
          >
            View Companies
          </button>
<<<<<<< HEAD
          <button
            className={activeTab === 'applied' ? 'active' : ''}
            onClick={() => setActiveTab('applied')}
          >
            View Applied Students
          </button>
=======
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>

      <main className="coordinator-main">
        {activeTab === 'add' && <AddCompanyForm />}
        {activeTab === 'view' && <ViewCompanies />}
<<<<<<< HEAD
        {activeTab === 'applied' && <ViewAppliedStudents />}
=======
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
      </main>
    </div>
  );
};

export default CoordinatorDashboard;
