import { Router } from "express";

import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../services/review/review.service.js";

const reviewRouter = Router();

// =====================================
// Create Review
// POST /api/reviews
// =====================================

reviewRouter.post("/", async (req, res) => {
  try {
    const review = await createReview(req.body);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to create review",
    });
  }
});

// =====================================
// Get All Reviews
// GET /api/reviews
// =====================================

reviewRouter.get("/", async (req, res) => {
  try {
    const reviews = await getAllReviews();

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
});

// =====================================
// Get Review By ID
// GET /api/reviews/:id
// =====================================

reviewRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const review = await getReviewById(id);

    res.status(200).json({
      success: true,
      message: "Review fetched successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Review not found",
    });
  }
});

// =====================================
// Update Review
// PATCH /api/reviews/:id
// =====================================

reviewRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const review = await updateReview(id, req.body);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to update review",
    });
  }
});

// =====================================
// Soft Delete Review
// DELETE /api/reviews/:id
// =====================================

reviewRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const review = await deleteReview(id);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(404).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to delete review",
    });
  }
});

export default reviewRouter;