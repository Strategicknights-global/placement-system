<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import "./CompanyApplyView.css";
=======
import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import './CompanyApplyView.css';
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591

const CompanyApplyView = () => {
  const [companies, setCompanies] = useState([]);
  const [studentProfile, setStudentProfile] = useState(null);
  const [appliedCompanyIds, setAppliedCompanyIds] = useState([]);
<<<<<<< HEAD
  const [user, setUser] = useState(null);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch profile + companies + applied companies
=======
  const user = auth.currentUser;

>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

<<<<<<< HEAD
      try {
        // 🔹 Fetch student profile
        const profileRef = doc(db, "profiles", user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          setStudentProfile(profileSnap.data());
        }

        // 🔹 Fetch all companies
        const companySnap = await getDocs(collection(db, "companies"));
        const companyList = companySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCompanies(companyList);

        // 🔹 Fetch already applied companies
        const appliedSnap = await getDocs(
          collection(db, "appliedCompanies", user.uid, "companies")
        );
        const appliedIds = appliedSnap.docs.map((doc) => doc.id);
        setAppliedCompanyIds(appliedIds);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
=======
      // Fetch student profile
      const profileRef = doc(db, 'profiles', user.uid);
      const profileSnap = await getDoc(profileRef);
      setStudentProfile(profileSnap.data());

      // Fetch companies
      const companySnap = await getDocs(collection(db, 'companies'));
      const companyList = companySnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCompanies(companyList);

      // Fetch already applied companies
      const appliedSnap = await getDocs(collection(db, `appliedCompanies/${user.uid}/companies`));
      const appliedIds = appliedSnap.docs.map(doc => doc.id);
      setAppliedCompanyIds(appliedIds);
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
    };

    fetchData();
  }, [user]);

  const isEligible = (company) => {
<<<<<<< HEAD
    if (!studentProfile) return false;
    const { cgpa, arrears } = studentProfile;
    return (
      parseFloat(cgpa || 0) >= parseFloat(company.minCgpa || 0) &&
=======
    const { cgpa, arrears } = studentProfile || {};
    return (
      parseFloat(cgpa) >= parseFloat(company.minCgpa || 0) &&
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
      parseInt(arrears || 0) <= parseInt(company.maxArrears || 0)
    );
  };

  const handleApply = async (companyId) => {
    if (!user) return;

<<<<<<< HEAD
    try {
      // 🔹 Save application in company doc
      await setDoc(
        doc(db, "companies", companyId, "appliedStudents", user.uid),
        { studentId: user.uid }
      );

      // 🔹 Save application in student doc
      await setDoc(
        doc(db, "appliedCompanies", user.uid, "companies", companyId),
        { companyId }
      );

      setAppliedCompanyIds((prev) => [...prev, companyId]);
      alert("Applied successfully!");
    } catch (error) {
      console.error("Error applying:", error);
      alert("Failed to apply.");
    }
=======
    await setDoc(doc(db, `companies/${companyId}/appliedStudents`, user.uid), {
      studentId: user.uid,
    });

    await setDoc(doc(db, `appliedCompanies/${user.uid}/companies`, companyId), {
      companyId: companyId,
    });

    setAppliedCompanyIds(prev => [...prev, companyId]);
    alert("Applied successfully!");
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
  };

  return (
    <div className="company-view-container">
      <h3 className="company-title">Available Companies</h3>
      <div className="company-list">
<<<<<<< HEAD
        {companies.map((company) => {
=======
        {companies.map(company => {
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
          const alreadyApplied = appliedCompanyIds.includes(company.id);
          const eligible = isEligible(company);

          return (
            <div key={company.id} className="company-card">
              <h4>{company.name}</h4>
<<<<<<< HEAD
              <p>
                <strong>Required CGPA:</strong> {company.minCgpa}
              </p>
              <p>
                <strong>Max Arrears Allowed:</strong> {company.maxArrears}
              </p>
=======
              <p><strong>Required CGPA:</strong> {company.minCgpa}</p>
              <p><strong>Max Arrears Allowed:</strong> {company.maxArrears}</p>
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591

              <button
                className="apply-btn"
                onClick={() => handleApply(company.id)}
                disabled={alreadyApplied || !eligible}
              >
<<<<<<< HEAD
                {alreadyApplied
                  ? "Applied"
                  : eligible
                  ? "Apply"
                  : "Not Eligible"}
=======
                {alreadyApplied ? 'Applied' : eligible ? 'Apply' : 'Not Eligible'}
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyApplyView;
