// const admin = require('firebase-admin');
import * as admin from 'firebase-admin';
import { config } from './../../config';
const serviceAccount = require('./../../../../firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.dbUrl,
});

export const firebase = admin.firestore();

// exports.firebase = firebase;
