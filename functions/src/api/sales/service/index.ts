import { firebase } from './../../../utils/firebase';
import * as admin from 'firebase-admin';

import { getCommodities, getCommodity } from '../../commodities/service';
import { getProvider, getProviders } from '../../providers/service';

const collection = 'sales';

const createdTimestamp = admin.firestore.FieldValue.serverTimestamp();
const auditField = {
  timestamp: createdTimestamp,
};

export const getSales = async () => {
  let data: any[] = [];
  const snapshot = await firebase.collection(collection).get();

  const commodities = await getCommodities();
  const providers = await getProviders();

  if (snapshot.empty) return [];

  snapshot.forEach(async (element) => {
    const sale = element.data();

    const commodity = commodities.find(
      (element) => element.id === sale?.commodityId,
    );
    const provider = providers.find(
      (element) => element.id === sale?.providerId,
    );

    const composedData = {
      id: element.id,
      commodityClass: sale.commodityClass,
      commodity: {
        name: commodity.name,
      },
      deliveryId: sale.deliveryId,
      price: sale.price,
      provider: {
        name: provider.name,
      },
      quantity: sale.quantity,
      saleDate: sale.saleDate,
      saleType: sale.saleType,
      total: sale.total,
      unit: sale.unit,
    };

    data.push(composedData);
  });

  return data;
};

export const getSale = async (id: any) => {
  const data = await firebase.collection(collection).doc(id).get();

  if (!data.exists) return [];

  const sale = data?.data();
  const commodity = await getCommodity(sale?.commodityId);

  const composedData = {
    ...sale,
    commodityId: commodity,
  };
  return composedData;
};

export const createSale = async (item: any) => {
  const data = await firebase
    .collection(collection)
    .add({ ...item, ...auditField });
  return data.id;
};

export const updateSale = async (id: any, item: any) => {
  const data = await firebase
    .collection(collection)
    .doc(id)
    .update({ ...item, ...auditField });
  return data.writeTime;
};

export const deleteSale = async (id: any) => {
  const data = await firebase.collection(collection).doc(id).delete();
  return data.writeTime;
};
