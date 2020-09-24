import { firebase } from '../../../utils/firebase';
import * as admin from 'firebase-admin';

const collection = 'providers';

const createdTimestamp = admin.firestore.FieldValue.serverTimestamp();
const auditField = {
  timestamp: createdTimestamp,
};

export const getProviders = async () => {
  const data: any[] = [];
  const snapshot = await firebase.collection(collection).get();
  snapshot.forEach((element) => {
    data.push({
      id: element.id,
      ...element.data(),
    });
  });
  return data || [];
};

export const getProvider = async (id: any) => {
  const data = await firebase.collection(collection).doc(id).get();
  return data?.data() || [];
};

export const createProvider = async (item: any) => {
  const data = await firebase
    .collection(collection)
    .add({ ...item, ...auditField });
  return data.id;
};

export const updateProvider = async (id: any, item: any) => {
  const data = await firebase
    .collection(collection)
    .doc(id)
    .update({ ...item, ...auditField });
  return data.writeTime;
};

export const deleteProvider = async (id: any) => {
  const data = await firebase.collection(collection).doc(id).delete();
  return data.writeTime;
};
