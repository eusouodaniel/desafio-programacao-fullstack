import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../database";
import AppError from '../errors/AppError';
import User from "../entities/user.model";
import auth from "../config/auth";

class AuthController {
  async login(req: Request, res: Response) {
    let { email, password } = req.body;

    if (!(email && password)) {
      throw new AppError("Email is required", 403);
    }

    const userRepository = AppDataSource.getRepository(User);

    try {
      let user = await userRepository.findOneOrFail({ where: { email } });
      if (!user.checkIfUnencryptedPasswordIsValid(password)) {
        throw new AppError("Invalid token", 401);
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        auth.jwtSecret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ "token": token });
    } catch (e) {
      //log info
      console.log(e);
    }
  };

}

export default AuthController;
