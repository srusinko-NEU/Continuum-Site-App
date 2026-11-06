import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Ensure single Firebase app initialization
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with Google Drive Scopes
const provider = new GoogleAuthProvider();
export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive'
];

DRIVE_SCOPES.forEach(scope => provider.addScope(scope));

// In-memory token cache (never stored in localStorage/sessionStorage per security rules)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
}

/**
 * Initialize Drive Auth listener. Clears cached token when signed out.
 */
export const initDriveAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

/**
 * Sign in with Google to grant Drive access for build asset discovery
 */
export const signInWithDrive = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve Google OAuth access token');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('[Google Drive] Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Get current in-memory access token
 */
export const getDriveAccessToken = (): string | null => {
  return cachedAccessToken;
};

/**
 * Sign out and clear in-memory token
 */
export const signOutDrive = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Search Drive files by name query or MIME type
 */
export const searchDriveFiles = async (
  query: string,
  pageSize: number = 20
): Promise<DriveFileItem[]> => {
  const token = getDriveAccessToken();
  if (!token) {
    throw new Error('User not authenticated with Google Drive.');
  }

  const q = encodeURIComponent(`name contains '${query}' and trashed = false`);
  const fields = encodeURIComponent('files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${q}&pageSize=${pageSize}&fields=${fields}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Drive API query failed: ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
};

/**
 * List recent Drive files
 */
export const listRecentDriveFiles = async (
  pageSize: number = 25
): Promise<DriveFileItem[]> => {
  const token = getDriveAccessToken();
  if (!token) {
    throw new Error('User not authenticated with Google Drive.');
  }

  const fields = encodeURIComponent('files(id, name, mimeType, size, modifiedTime, webViewLink, webContentLink)');
  const url = `https://www.googleapis.com/drive/v3/files?pageSize=${pageSize}&orderBy=modifiedTime desc&fields=${fields}&q=trashed=false`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Drive API list failed: ${errorText}`);
  }

  const data = await res.json();
  return data.files || [];
};
