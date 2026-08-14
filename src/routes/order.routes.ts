import { Router } from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../services/order/order.service.js";

const orderRouter = Router();

// =====================================
// Create Order
// POST /api/orders
// =====================================

orderRouter.post("/", async (req, res) => {
  try {
    const order = await createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create order",
    });
  }
});

// =====================================
// Get All Orders
// GET /api/orders
// =====================================

orderRouter.get("/", async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
});

// =====================================
// Get Order By ID
// GET /api/orders/:id
// =====================================

orderRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await getOrderById(id);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Order not found",
    });
  }
});

// =====================================
// Update Order
// PATCH /api/orders/:id
// =====================================

orderRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await updateOrder(id, req.body);

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update order",
    });
  }
});

// =====================================
// Soft Delete Order
// DELETE /api/orders/:id
// =====================================

orderRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await deleteOrder(id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete order",
    });
  }
});

export default orderRouter;