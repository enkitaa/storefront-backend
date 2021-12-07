import express from "express";
import { Order, OrderList } from "../models/order";
import authTokenVerify from "./../middleware/auth";

const order = new OrderList();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const orders = await order.index();
    res.send(orders);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const orderInfo = await order.show(parseInt(req.params.id));
    res.send(orderInfo);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const create = async (req: express.Request, res: express.Response) => {
  try {
    const orderInfo: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const newOrder = await order.create(orderInfo);
    res.send(newOrder);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const update = async (req: express.Request, res: express.Response) => {
  try {
    const orderInfo: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const updatedOrder = await order.update(parseInt(req.params.id), orderInfo);
    res.send(updatedOrder);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const deleteOrder = async (req: express.Request, res: express.Response) => {
  try {
    const deletedOrder = await order.delete(parseInt(req.params.id));
    res.send(deletedOrder);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
      res.json(err.message);
    }
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", authTokenVerify, index);
  app.get("/orders/:id", authTokenVerify, show);
  app.post("/orders", authTokenVerify, create);
  app.put("/orders/:id", authTokenVerify, update);
  app.delete("/orders/:id", authTokenVerify, deleteOrder);
};

export default orderRoutes;
