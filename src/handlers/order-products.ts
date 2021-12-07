import express from 'express';
import { OrderProduct, OrderProductList } from "../models/order-products";
import authTokenVerify from "./../middleware/auth";

const orderProduct = new OrderProductList();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orderProducts = await orderProduct.index();
    res.send(orderProducts);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      }
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const orderProductInfo = await orderProduct.show(parseInt(req.params.id));
    res.send(orderProductInfo);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      }
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const orderProductInfo: OrderProduct = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };
    const newOrderProduct = await orderProduct.create(orderProductInfo);
    res.send(newOrderProduct);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      }
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const orderProductInfo: OrderProduct = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const updatedOrderProduct = await orderProduct.update(parseInt(req.params.id), orderProductInfo);
    res.send(updatedOrderProduct);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      }
  }
};

const deleteOrderProduct = async (req: express.Request, res: express.Response) => {
  try {
    const deletedOrderProd = await orderProduct.delete(parseInt(req.params.id));
    res.send(deletedOrderProd);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      }
  }
};

const orderProductRoutes = (app: express.Application) => {
  app.get('/order_products', authTokenVerify, index);
  app.get('/order_products/:id', authTokenVerify, show);
  app.post('/order_products', authTokenVerify, create);
  app.put('/order_products/:id', authTokenVerify, update);
  app.delete('/order_products/:id', authTokenVerify, deleteOrderProduct);
};

export default orderProductRoutes;
