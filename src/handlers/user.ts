import express from "express";
import jwt from "jsonwebtoken";
import { User, UserList } from "../models/user";
import authTokenVerify from './../middleware/auth'

const user = new UserList();

const index = async (_req: express.Request, res: express.Response) => {
  try {
    const users = await user.index();
    res.send(users);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      } 
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const userInfo = await user.show(req.params.id);
    res.send(userInfo);
  } catch (err) {
    res.status(400);
    if (err instanceof Error) {
        res.json(err.message);
      }
  }
};

const create = async (req: express.Request, res: express.Response) => {
    try {
      const userInfo: User = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: req.body.password
      };
      const newUser = await user.create(userInfo);
      const token = jwt.sign({ user: newUser }, process.env.JWT_TOKEN_SECRET as jwt.Secret);
      res.send({ token });
    } catch (err) {
      res.status(400);
      if (err instanceof Error) {
        res.json(err.message);
      }
    }
  };
  const update = async (req: express.Request, res: express.Response) => {
    try {
      const userInfo: User = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: req.body.password
      };
  
      const editedUser = await user.update(req.params.id, userInfo);
      res.send(editedUser);
    } catch (err) {
      res.status(400);
      if (err instanceof Error) {
        res.json(err.message);
      }
    }
  };
  
  const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
      const deleted = await user.delete(req.params.id);
      res.send(deleted);
    } catch (err) {
      res.status(400);
      if (err instanceof Error) {
        res.json(err.message);
      }
    }
  };
  
  const authenticate = async (req: express.Request, res: express.Response) => {
    try {
      const userInfo: User = {
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        password: req.body.password
      };
      const authUser = await user.authenticate(userInfo);
      const token = jwt.sign({ user: authUser }, process.env.JWT_TOKEN_SECRET as jwt.Secret);
      res.send({ token });
    } catch (err) {
      res.status(400);
      if (err instanceof Error) {
        res.json(err.message);
      }
    }
  };
  
  const userRoutes = (app: express.Application) => {
    app.get('/users', authTokenVerify, index);
    app.get('/users/:id', authTokenVerify, show);
    app.post('/users', create);
    app.put('/users/:id', authTokenVerify, update);
    app.delete('/users/:id', authTokenVerify, deleteUser);
    app.post('/users/login', authenticate);
  };

  export default userRoutes;