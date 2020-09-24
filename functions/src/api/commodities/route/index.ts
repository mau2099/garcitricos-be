import express from 'express';
import {
  getCommodities,
  getCommodity,
  createCommodity,
  deleteCommodity,
  updateCommodity,
} from '../service';

export const apiRouterCommodities = (app: any) => {
  const router = express.Router();
  app.use('/api/commodities', router);

  router.get('/', async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const data = await getCommodities();
      return res.status(200).json({
        data,
        message:
          Object.keys(data).length > 0 ? 'all retrieved!' : `none found :c`,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const data = await getCommodity(id);
      return res.status(200).json({
        data,
        message: Object.keys(data).length > 0 ? 'got one!' : `not found :c`,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req: any, res: any, next: any) => {
    try {
      const { body: sale } = req;
      const id = await createCommodity(sale);
      res.status(201).json({ data: id, message: `created!` });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req: any, res: any, next: any) => {
    try {
      const { body: sale = {} } = req;
      const { id } = req.params;
      const updated = await updateCommodity(id, sale);
      res.status(200).json({ data: updated, message: 'updated!' });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const deleted = await deleteCommodity(id);
      res.status(200).json({ data: deleted, message: 'deleted!' });
    } catch (err) {
      next(err);
    }
  });
};
