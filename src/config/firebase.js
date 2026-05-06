import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmUqhDkxIMm24u9apKfRuSmlbO14MGEtg",
  authDomain: "robotica-2026-papa.firebaseapp.com",
  projectId: "robotica-2026-papa",
  storageBucket: "robotica-2026-papa.firebasestorage.app",
  messagingSenderId: "1016569195298",
  appId: "1:1016569195298:web:f0b84615ed6097e2e1537b",
  measurementId: "G-6M4E56FQ5T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default db;
