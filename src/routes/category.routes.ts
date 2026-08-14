import { Router } from "express";
import createCategory, { deleteCategory, getAllCategory, getSingleCategory, updateCategory } from "../services/category/category.service.js";


const categoryRouter = Router();

categoryRouter.post("/",async(req,res)=>{
     try {
    const { name, description , slug} = req.body;

    const category = await createCategory(
      name,
      slug,
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


categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await getAllCategory();
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch categories",
    });
  }
});


categoryRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getSingleCategory(id);

    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch category",
    });
  }
});


categoryRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await updateCategory(id, name, description);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update category",
    });
  }
});


categoryRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteCategory(id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete category",
    });
  }
});

export default categoryRouter