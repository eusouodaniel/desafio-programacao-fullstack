import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../database";
import User from "../entities/user.model";
import AppError from '../errors/AppError';

export default (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;
    const userRepository = AppDataSource.getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneByOrFail({
        id: id
      });
      roles.indexOf(user.role) > -1 ? next() : res.status(401).send();
    } catch (e) {
      //log info
      console.log(e);
      throw new AppError("Invalid Token", 401);
    }
  };
};
