import { Router } from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product/product.service.js";

const productRouter = Router();

// =====================================
// Create Product
// POST /api/products
// =====================================

productRouter.post("/", async (req, res) => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create product",
    });
  }
});

// =====================================
// Get All Products
// GET /api/products
// =====================================

productRouter.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});

// =====================================
// Get Product By ID
// GET /api/products/:id
// =====================================

productRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductById(id);

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Product not found",
    });
  }
});

// =====================================
// Update Product
// PATCH /api/products/:id
// =====================================

productRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await updateProduct(id, req.body);

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update product",
    });
  }
});

// =====================================
// Soft Delete Product
// DELETE /api/products/:id
// =====================================

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await deleteProduct(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete product",
    });
  }
});

export default productRouter;