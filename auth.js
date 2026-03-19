import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged,
  GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  doc, setDoc, getDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function registerUser({ name, email, password, role, bloodGroup, phone, hospital }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid  = cred.user.uid;
  const profileData = {
    uid, name, email, role,
    createdAt: serverTimestamp(),
    ...(role === 'donor' ? {
      bloodGroup: bloodGroup || '',
      phone: phone || '',
      totalDonations: 0,
      lastDonation: null,
      status: 'Active'
    } : {}),
    ...(role === 'hospital' ? {
      hospitalName: hospital || name,
      phone: phone || ''
    } : {}),
    ...(role === 'admin' ? {} : {})
  };
  await setDoc(doc(db, 'users', uid), profileData);
  await setDoc(doc(db, role + 's', uid), profileData);
  return { uid, role };
}

export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const uid  = cred.user.uid;
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) throw new Error('User profile not found.');
  const data = snap.data();
  sessionStorage.setItem('bl_uid',  uid);
  sessionStorage.setItem('bl_role', data.role);
  sessionStorage.setItem('bl_name', data.name);
  return data;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result   = await signInWithPopup(auth, provider);
  const uid      = result.user.uid;
  const snap     = await getDoc(doc(db, 'users', uid));
  if (snap.exists()) {
    const data = snap.data();
    sessionStorage.setItem('bl_uid',  uid);
    sessionStorage.setItem('bl_role', data.role);
    sessionStorage.setItem('bl_name', data.name);
    return data;
  } else {
    // New Google user — default to donor
    const name  = result.user.displayName || 'User';
    const email = result.user.email;
    const profileData = {
      uid, name, email, role: 'donor',
      bloodGroup: '', phone: '',
      totalDonations: 0, lastDonation: null,
      status: 'Active', createdAt: serverTimestamp()
    };
    await setDoc(doc(db, 'users', uid), profileData);
    await setDoc(doc(db, 'donors', uid), profileData);
    sessionStorage.setItem('bl_uid',  uid);
    sessionStorage.setItem('bl_role', 'donor');
    sessionStorage.setItem('bl_name', name);
    return profileData;
  }
}

export async function logoutUser() {
  await signOut(auth);
  sessionStorage.clear();
  window.location.href = 'index.html';
}

export function requireAuth(allowedRoles = []) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) { window.location.href = 'index.html'; return reject('Not logged in'); }
      const snap = await getDoc(doc(db, 'users', user.uid));
      if (!snap.exists()) { window.location.href = 'index.html'; return reject('No profile'); }
      const data = snap.data();
      if (allowedRoles.length && !allowedRoles.includes(data.role)) {
        redirectToDashboard(data.role); return reject('Wrong role');
      }
      sessionStorage.setItem('bl_uid',  user.uid);
      sessionStorage.setItem('bl_role', data.role);
      sessionStorage.setItem('bl_name', data.name);
      resolve(data);
    });
  });
}

export function redirectToDashboard(role) {
  const map = { admin: 'dashboard-admin.html', donor: 'dashboard-donor.html', hospital: 'dashboard-hospital.html' };
  window.location.href = map[role] || 'index.html';
}
