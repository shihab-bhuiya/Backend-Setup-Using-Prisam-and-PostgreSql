import prisma from "../../lib/prisma.js";
import { OrderStatus } from "../../generated/prisma/client.js";

// =====================================
// Create Order
// =====================================

export const createOrder = async (data: {
  userId: string;
  productId: string;
  quantity: number;
}) => {
  try {
    if (!data.userId) {
      throw new Error("User ID is required");
    }

    if (!data.productId) {
      throw new Error("Product ID is required");
    }

    if (!Number.isInteger(data.quantity) || data.quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
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

    // Check stock
    if (product.stock < data.quantity) {
      throw new Error("Not enough product stock");
    }

    // Create order + decrease stock together
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity,
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
              price: true,
              stock: true,
            },
          },
        },
      });

      await tx.product.update({
        where: {
          id: data.productId,
        },
        data: {
          stock: {
            decrement: data.quantity,
          },
        },
      });

      return newOrder;
    });

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// =====================================
// Get All Orders
// =====================================

export const getAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany({
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
            price: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// =====================================
// Get Order By ID
// =====================================

export const getOrderById = async (id: string) => {
  try {
    const order = await prisma.order.findFirst({
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
            price: true,
          },
        },
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// =====================================
// Update Order Status
// =====================================

export const updateOrder = async (
  id: string,
  data: {
    status?: OrderStatus;
  }
) => {
  try {
    const existingOrder = await prisma.order.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        ...(data.status !== undefined && {
          status: data.status,
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
            price: true,
          },
        },
      },
    });

    return updatedOrder;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// =====================================
// Soft Delete Order
// =====================================

export const deleteOrder = async (id: string) => {
  try {
    const existingOrder = await prisma.order.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    const deletedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};