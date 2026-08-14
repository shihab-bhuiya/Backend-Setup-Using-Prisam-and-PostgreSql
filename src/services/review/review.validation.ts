import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be greater than 5"),

  comment: z
    .string()
    .trim()
    .max(500, "Comment cannot exceed 500 characters")
    .optional(),

  userId: z.string().uuid("Invalid user ID"),

  productId: z.string().uuid("Invalid product ID"),
});

export const updateReviewSchema = z.object({
  rating: z
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be greater than 5")
    .optional(),

  comment: z
    .string()
    .trim()
    .max(500, "Comment cannot exceed 500 characters")
    .optional(),
});