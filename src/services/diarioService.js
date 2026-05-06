import { db } from '../config/firebase.js';
import {
  collection,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';

const COLLECTION_PATH = 'diarios';
const DOCUMENT_ID = 'obr-2026';
const SUBCOLLECTION_PATH = 'resgate';

export const fetchAllDiarios = async () => {
  try {
    const diarioDocRef = doc(db, COLLECTION_PATH, DOCUMENT_ID);
    const diariesRef = collection(diarioDocRef, SUBCOLLECTION_PATH);

    const snapshot = await getDocs(diariesRef);

    if (snapshot.empty) {
      return [];
    }

    const diarios = [];
    snapshot.forEach(docSnapshot => {
      diarios.push({
        id: docSnapshot.id,
        ...docSnapshot.data()
      });
    });

    return diarios.sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Erro ao buscar diários:', error);
    throw error;
  }
};

export const fetchDiarioById = async (diarioId) => {
  try {
    const diarioDocRef = doc(db, COLLECTION_PATH, DOCUMENT_ID);
    const diarioRef = doc(diarioDocRef, SUBCOLLECTION_PATH, diarioId);

    const snapshot = await getDoc(diarioRef);

    if (snapshot.exists()) {
      return {
        id: diarioId,
        ...snapshot.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Erro ao buscar diário:', error);
    throw error;
  }
};

export const fetchDiariosByDate = async (startDate, endDate) => {
  try {
    const diarioDocRef = doc(db, COLLECTION_PATH, DOCUMENT_ID);
    const diariesRef = collection(diarioDocRef, SUBCOLLECTION_PATH);

    const snapshot = await getDocs(diariesRef);

    if (snapshot.empty) {
      return [];
    }

    const diarios = [];
    snapshot.forEach(docSnapshot => {
      diarios.push({
        id: docSnapshot.id,
        ...docSnapshot.data()
      });
    });

    const filtered = diarios.filter(diario => {
      const diarioDate = new Date(diario.data);
      return diarioDate >= new Date(startDate) && diarioDate <= new Date(endDate);
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Erro ao buscar diários por data:', error);
    throw error;
  }
};

export const fetchDiariosByTeam = async (teamName) => {
  try {
    const diarioDocRef = doc(db, COLLECTION_PATH, DOCUMENT_ID);
    const diariesRef = collection(diarioDocRef, SUBCOLLECTION_PATH);

    const snapshot = await getDocs(diariesRef);

    if (snapshot.empty) {
      return [];
    }

    const diarios = [];
    snapshot.forEach(docSnapshot => {
      diarios.push({
        id: docSnapshot.id,
        ...docSnapshot.data()
      });
    });

    const filtered = diarios.filter(diario =>
      diario.integrantes.toLowerCase().includes(teamName.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const dateA = new Date(a.data);
      const dateB = new Date(b.data);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Erro ao buscar diários por equipe:', error);
    throw error;
  }
};
