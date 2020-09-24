import express from 'express';
import {
  createSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
} from '../service';
// const { idSchema, createSaleSchema } = require('/utils/schemas/sales');
// const validateSchemaMiddleware = require('/utils/middleware/validateDataHandler');
// const cacheResponse = require('utils/cacheResponse');
import { cacheResponse } from './../../../utils/cacheResponse';
import {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} from './../../../utils/constants';

export const apiRouterSales = (app: any) => {
  const router = express.Router();
  app.use('/api/sales', router);

  router.get(
    '/',
    // validateSchemaMiddleware(idSchema, 'params'),
    async (req: any, res: any, next: any) => {
      try {
        const { id } = req.params;
        const data = await getSales();

        // return res.status(200).send('GET FROM api/sales!', id);
        return res.status(200).json({
          data: data,
          message: 'all found',
          // message: ''Object.keys(one).length > 0 ? 'got one!' : `not found :c`,''
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.get(
    '/:id',
    // validateSchemaMiddleware(idSchema, 'params'),
    async (req: any, res: any, next: any) => {
      try {
        const { id } = req.params;
        const data = await getSale(id);
        // return res.status(200).send('GET FROM api/sales!', id);
        return res.status(200).json({
          data: data,
          message: 'all found',
          // message: ''Object.keys(one).length > 0 ? 'got one!' : `not found :c`,''
        });
      } catch (err) {
        next(err);
      }
    },
  );

  router.post(
    '/',
    // validateSchemaMiddleware(createSaleSchema),
    async (req: any, res: any, next: any) => {
      try {
        const { body: sale } = req;
        const id = await createSale(sale);
        res.status(201).json({ data: id, message: `created! ${id}` });
      } catch (err) {
        next(err);
      }
    },
  );

  router.put('/:id', async (req: any, res: any, next: any) => {
    try {
      const { body: sale = {} } = req;
      const { id } = req.params;
      const updated = await updateSale(id, sale);
      res.status(200).json({ data: updated, message: 'updated!' });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const deleted = await deleteSale(id);
      res.status(200).json({ data: deleted, message: 'deleted!' });
    } catch (err) {
      next(err);
    }
  });
};
