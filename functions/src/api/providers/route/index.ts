import express from 'express';
import {
  getProvider,
  getProviders,
  createProvider,
  deleteProvider,
  updateProvider,
} from '../service';

export const apiRouterProviders = (app: any) => {
  const router = express.Router();
  app.use('/api/providers', router);

  router.get('/', async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const data = await getProviders();
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
      const data = await getProvider(id);
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
      const id = await createProvider(sale);
      res.status(201).json({ data: id, message: `created!` });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req: any, res: any, next: any) => {
    try {
      const { body: sale = {} } = req;
      const { id } = req.params;
      const updated = await updateProvider(id, sale);
      res.status(200).json({ data: updated, message: 'updated!' });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req: any, res: any, next: any) => {
    try {
      const { id } = req.params;
      const deleted = await deleteProvider(id);
      res.status(200).json({ data: deleted, message: 'deleted!' });
    } catch (err) {
      next(err);
    }
  });
};
