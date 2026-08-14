import prisma from "../../lib/prisma.js";

// =====================================
// Create Review
// =====================================

export const createReview = async (data: {
  rating: number;
  comment?: string;
  userId: string;
  productId: string;
}) => {
  try {
    // Validate rating
    if (
      data.rating < 1 ||
      data.rating > 5 ||
      !Number.isInteger(data.rating)
    ) {
      throw new Error("Rating must be an integer between 1 and 5");
    }

    // Check user
    const user = await prisma.user.findFirst({
      where: {
        id: data.userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check product
    const product = await prisma.product.findFirst({
      where: {
        id: data.productId,
        isDeleted: false,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment?.trim(),
        userId: data.userId,
        productId: data.productId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return review;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// =====================================
// Get All Reviews
// =====================================

export const getAllReviews = async () => {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

// =====================================
// Get Review By ID
// =====================================

export const getReviewById = async (id: string) => {
  try {
    const review = await prisma.review.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!review) {
      throw new Error("Review not found");
    }

    return review;
  } catch (error) {
    console.error("Error fetching review:", error);
    throw error;
  }
};

// =====================================
// Update Review
// =====================================

export const updateReview = async (
  id: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  try {
    const existingReview = await prisma.review.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingReview) {
      throw new Error("Review not found");
    }

    // Validate rating if provided
    if (
      data.rating !== undefined &&
      (data.rating < 1 ||
        data.rating > 5 ||
        !Number.isInteger(data.rating))
    ) {
      throw new Error("Rating must be an integer between 1 and 5");
    }

    const updatedReview = await prisma.review.update({
      where: {
        id,
      },
      data: {
        ...(data.rating !== undefined && {
          rating: data.rating,
        }),

        ...(data.comment !== undefined && {
          comment: data.comment.trim(),
        }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return updatedReview;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// =====================================
// Soft Delete Review
// =====================================

export const deleteReview = async (id: string) => {
  try {
    const existingReview = await prisma.review.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingReview) {
      throw new Error("Review not found");
    }

    const deletedReview = await prisma.review.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedReview;
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};