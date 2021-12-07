import express from 'express';
import jwt from 'jsonwebtoken';

const authTokenVerify = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    //Get token from req header passed as bearer token 
    const authHeader = req.headers.authorization as string;
    if (!authHeader) {
      throw new Error('JWT Token Required');
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_TOKEN_SECRET as jwt.Secret);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    return;
  }
};

export default authTokenVerify;
