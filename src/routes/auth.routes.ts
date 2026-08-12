import { Router, type Request, type Response } from "express";
import registerUser from "../services/auth/auth.service.js";

const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const users = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User Register Succesfully",
            data: users,

    });

  } 
  
  
  catch (error){
        res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });

  }
});


export default authRouter