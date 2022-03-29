import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import AuthJWT from "../middlewares/auth.jwt";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', authController.login);
authRouter.get('/me', AuthJWT, authController.getInfoUser);

export default authRouter;
