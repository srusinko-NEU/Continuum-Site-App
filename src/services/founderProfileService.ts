import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const dbId = (firebaseConfig as Record<string, string | undefined>).firestoreDatabaseId;
export const db = dbId ? getFirestore(app, dbId) : getFirestore(app);

const PROFILE_DOC_ID = 'sean_rusinko';

export interface FounderProfileData {
  headshotUrl?: string;
  updatedAt?: string;
  permanentAssetPath?: string;
}

/**
 * Loads headshot from Firestore
 */
export async function fetchRemoteHeadshot(): Promise<string | null> {
  try {
    const docRef = doc(db, 'founder_profile', PROFILE_DOC_ID);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data() as FounderProfileData;
      return data.headshotUrl || null;
    }
  } catch (err) {
    console.warn('Firestore fetch remote headshot error:', err);
  }
  return null;
}

/**
 * Saves headshot to Firestore
 */
export async function saveRemoteHeadshot(dataUrl: string): Promise<boolean> {
  try {
    const docRef = doc(db, 'founder_profile', PROFILE_DOC_ID);
    await setDoc(docRef, {
      headshotUrl: dataUrl,
      permanentAssetPath: '/sean_rusinko.jpg',
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firestore save remote headshot error:', err);
    return false;
  }
}

/**
 * Saves uploaded headshot to disk via server API and Firestore
 */
export async function persistHeadshotPermanently(dataUrl: string): Promise<{ success: boolean; url: string }> {
  let diskSuccess = false;

  // 1. Send to server endpoint to write to public/ and src/assets/images/
  try {
    const res = await fetch('/api/save-headshot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: dataUrl })
    });
    if (res.ok) {
      diskSuccess = true;
    }
  } catch (err) {
    console.warn('Failed to save headshot to server disk:', err);
  }

  // 2. Save to Firestore for multi-client/cloud synchronization
  await saveRemoteHeadshot(dataUrl);

  // 3. Cache in localStorage
  try {
    localStorage.setItem('continuum_founder_headshot', dataUrl);
    localStorage.setItem('continuum_headshot_persisted', 'true');
  } catch (e) {
    console.warn('LocalStorage save warning:', e);
  }

  return {
    success: true,
    url: diskSuccess ? `/sean_rusinko.jpg?t=${Date.now()}` : dataUrl
  };
}
