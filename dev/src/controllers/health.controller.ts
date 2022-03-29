import { Request, Response } from "express";

class HealthController {
  async index(req: Request, res: Response) {
    return res.status(200).json("OK");
  }
}

export default HealthController;
