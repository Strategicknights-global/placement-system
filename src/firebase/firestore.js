<<<<<<< HEAD
import { db } from './config';
=======
// src/firebase/firestore.js
import { db } from './config'; // ✅ Only import db from config
>>>>>>> 89b9e1c5302752ea60348e64a1ad41e1f39ed591

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

// Add a new company
export const addCompany = async (companyData) => {
  return await addDoc(collection(db, 'companies'), companyData);
};

// Get all companies
export const getAllCompanies = async () => {
  const snapshot = await getDocs(collection(db, 'companies'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Get student profile by UID
export const getStudentProfile = async (uid) => {
  const docRef = doc(db, 'profiles', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Save or update student profile
export const setStudentProfile = async (uid, data) => {
  await setDoc(doc(db, 'profiles', uid), data);
};

// Apply to a company
export const applyToCompany = async (companyId, userId) => {
  await setDoc(doc(db, `companies/${companyId}/appliedStudents`, userId), {
    studentId: userId
  });

  await setDoc(doc(db, `appliedCompanies/${userId}/companies`, companyId), {
    companyId: companyId
  });
};

// Delete a company
export const deleteCompany = async (companyId) => {
  await deleteDoc(doc(db, 'companies', companyId));
};
