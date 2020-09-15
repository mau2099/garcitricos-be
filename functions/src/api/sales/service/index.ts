import { firebase } from './../../../utils/firebase';
import * as admin from 'firebase-admin';

const collection = 'sales';

const timestamp = admin.firestore.FieldValue.serverTimestamp();
const recordProps = {
  timestamp,
};

export const getSales = async () => {
  let data: any[] = [];
  const snapshot = await firebase.collection(collection).get();
  snapshot.forEach((element) => {
    data.push({
      id: element.id,
      ...element.data(),
    });
  });
  return data || [];
};

export const getSale = async (id: any) => {
  const data = await firebase.collection(collection).doc(id).get();
  return data?.data() || [];
};

export const createSale = async (item: any) => {
  const data = await firebase
    .collection(collection)
    .add({ item, ...recordProps });
  return data.id;
};

export const updateSale = async (id: any, item: any) => {
  const data = await firebase
    .collection(collection)
    .doc(id)
    .update({ item, ...recordProps });
  return data.writeTime;
};

export const deleteSale = async (id: any) => {
  const data = await firebase.collection(collection).doc(id).delete();
  return data.writeTime;
};
