import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AppError from '../errors/AppError';
import config from "../config/auth";

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const [, token] = authHeader.split(" ");

  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
    //log info
    console.log(e);
    throw new AppError("Invalid Token", 401);
  }

  const { userId, email } = jwtPayload;
  const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  next();
};
