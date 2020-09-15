const functions = require('firebase-functions');
const express = require('express');
import { apiRouterSales } from './api/sales/route';
// import { RequestHandler } from 'express';

const cors = require('cors');
const app = express();

// export const myMiddleware: RequestHandler = (request, response, next) => {
//   return response.status(200).send('Hello World!');
// };
// export const apiHandler: RequestHandler = (req, response, next) => {
//   return response.status(200).send('Hello!');
// };

// export const postHandler: RequestHandler = (req, response, next) => {
//   (async () => {
//     try {
//       await db.collection('items').add({ item: req.body.item });
//       return response.status(200).send();
//     } catch (error) {
//       console.log(error);
//       return response.status(500).send({ error, req, response });
//     }
//   })();
// };

app.use(cors({ origin: true }));

apiRouterSales(app);
app.get('/hello', (req: any, res: any) => {
  return res.status(200).send('Hello!');
});

exports.app = functions.https.onRequest(app);
