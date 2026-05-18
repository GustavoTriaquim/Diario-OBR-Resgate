import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlDSlQoZUx2AVJu_cQLFcg_VA23uTuwe4",
  authDomain: "diariosdebordo-2026.firebaseapp.com",
  projectId: "diariosdebordo-2026",
  storageBucket: "diariosdebordo-2026.firebasestorage.app",
  messagingSenderId: "543151893278",
  appId: "1:543151893278:web:26c5d7ddf891b2fdb0770f",
  measurementId: "G-TWXZT2Q1TE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default db;
