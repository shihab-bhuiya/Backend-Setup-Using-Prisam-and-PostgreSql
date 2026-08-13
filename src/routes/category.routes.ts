import { Router } from "express";
import createCategory from "../services/category/category.service.js";


const categoryRouter = Router();

categoryRouter.post("/",async(req,res)=>{
     try {
    const { name, description } = req.body;

    const category = await createCategory(
      name,
      description
    );

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create category",
    });
  }
});

export default categoryRouter