import { db } from './firebase-config.js';
import {
  collection, doc, getDocs, getDoc,
  addDoc, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── USERS ──
export const getUser = (uid) => getDoc(doc(db,'users',uid)).then(s=>s.exists()?s.data():null);
export const updateUser = (uid,data) => updateDoc(doc(db,'users',uid),{...data,updatedAt:serverTimestamp()});

// ── DONORS ──
export const getAllDonors = async () => {
  const snap = await getDocs(collection(db,'donors'));
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};
export const updateDonor = (uid,data) => updateDoc(doc(db,'donors',uid),{...data,updatedAt:serverTimestamp()});

// ── HOSPITALS ──
export const getAllHospitals = async () => {
  const snap = await getDocs(collection(db,'hospitals'));
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};

// ── BLOOD STOCK ──
export const getBloodStock = async () => {
  const snap = await getDocs(collection(db,'bloodStock'));
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};
export const updateBloodStock = (id,data) => updateDoc(doc(db,'bloodStock',id),{...data,updatedAt:serverTimestamp()});
export const initBloodStock = async () => {
  const groups = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
  for (const g of groups) {
    await setDoc(doc(db,'bloodStock',g),{ bloodGroup:g, units:0, minUnits:10 });
  }
};

// ── DONATIONS ──
export const getAllDonations = async () => {
  const q = query(collection(db,'donations'),orderBy('donatedAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};
export const getDonationsByDonor = async (uid) => {
  const q = query(collection(db,'donations'),where('donorUid','==',uid),orderBy('donatedAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};
export const addDonation = (data) => addDoc(collection(db,'donations'),{...data,donatedAt:serverTimestamp()});

// ── BLOOD REQUESTS ──
export const getAllRequests = async () => {
  const q = query(collection(db,'requests'),orderBy('requestedAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};
export const getRequestsByHospital = async (uid) => {
  const q = query(collection(db,'requests'),where('hospitalUid','==',uid),orderBy('requestedAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d=>({id:d.id,...d.data()}));
};
export const addRequest = (data) => addDoc(collection(db,'requests'),{...data,requestedAt:serverTimestamp()});
export const updateRequest = (id,data) => updateDoc(doc(db,'requests',id),{...data,updatedAt:serverTimestamp()});
export const deleteRequest = (id) => deleteDoc(doc(db,'requests',id));

// ── FORMAT ──
export const fmtDate = (ts) => {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
};
export const fmtDateTime = (ts) => {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
};
