import { db } from '../config/firebase.js';
import {
  collection,
  getDocs
} from 'firebase/firestore';

const COLLECTION_PATH = 'obr';
const SUBCOLLECTION_NAME = 'registros';

const normalizarDiario = (docData, modalidade) => {
  const base = {
    ...docData,
    modalidade: modalidade,
    data: docData.data?.toDdate ? docData.data.toDate() : (docData.data || new Date()),
    integrantes: docData.integrantes || '',
    acertos: docData.acertos || '0',
    tentativas: docData.tentativas || '0',
    taxa: docData.taxa || '0%',
    problema: docData.problema || '',
    aprendizado: docData.aprendizado || '',
    resultado: docData.resultado || '',
    proximosPassos: docData.proximosPassos || '',
    observacoes: docData.observacoes || '',
    linksExtras: docData.linksExtras || '',
  };

  if (modalidade === 'artistica') {
    return {
      ...base,
      atividades: docData.atividades || '',
      ensaio: docData.ensaio || 'Não',
      hipotese: docData.hipoteses || '',
      solucao: docData.solucao || '',
      isResgate: false
    };
  } else if (modalidade === 'resgate') {
    return {
      ...base,
      objetivos: docData.objetivos || '',
      desafios: docData.desafios || '',
      hipotese: docData.hipotese || '',
      solucao: docData.solucao || '',
      observacoes: docData.observacoes || '',
      resgate: docData.resgate || 'Não',
      capturou: docData.resgate === 'Sim' ? docData.capturou : '-',
      identificou: docData.resgate === 'Sim' ? docData.identificou : '-',
      entrega: docData.resgate === 'Sim' ? docData.entrega : '-',
      isResgate: true
    };
  }
};

export const fetchAllDiarios = async (modalidade = null) => {
  try {
    const diarios = [];
    const modalidades = modalidade ? [modalidade] : ['artistica', 'resgate'];

    for (const mod of modalidades) {
      const ref = collection(db, COLLECTION_PATH, mod, SUBCOLLECTION_NAME);
      const snapshot = await getDocs(ref);
      snapshot.forEach(d => diarios.push(normalizarDiario({ id: d.id, ...d.data() }, mod)));
    }
    return diarios.sort((a, b) => new Date(b.data) - new Date(a.data));
  } catch (e) {
    console.error(e);
    return [];
  }
};
