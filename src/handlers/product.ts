import express from 'express';
import { Product, ProductList } from '../models/product';
import authTokenVerify from './../middleware/auth';

const product = new ProductList();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const products = await product.index();
    res.send(products);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const productInfo = await product.show(parseInt(req.params.id));
    res.send(productInfo);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const productInfo: Product = {
      name: req.body.name,
      price: req.body.price
    };
    const newProduct = await product.create(productInfo);
    res.send(newProduct);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const productInfo: Product = {
      name: req.body.name,
      price: req.body.price
    };
    const updatedProduct = await product.update(parseInt(req.params.id), productInfo);
    res.send(updatedProduct);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const deleteProduct = async (req: express.Request, res: express.Response) => {
  try {
    const deleted = await product.delete(parseInt(req.params.id));
    res.send(deleted);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', authTokenVerify, create);
  app.put('/products/:id', authTokenVerify, update);
  app.delete('/products/:id', authTokenVerify, deleteProduct);
};

export default productRoutes;
