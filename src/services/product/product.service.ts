import prisma from "../../lib/prisma.js";
import { ProductStatus } from "../../generated/prisma/client.js";

// =====================================
// Create Product
// =====================================

export const createProduct = async (data: {
  title: string;
  description: string;
  price: number;
  stock: number;
  status?: ProductStatus;
  categoryId: string;
}) => {
  try {
    if (!data.title || data.title.trim() === "") {
      throw new Error("Product title is required");
    }

    if (!data.description || data.description.trim() === "") {
      throw new Error("Product description is required");
    }

    if (data.price < 0) {
      throw new Error("Price cannot be negative");
    }

    if (data.stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    // Check category exists
    const category = await prisma.category.findFirst({
      where: {
        id: data.categoryId,
        isDeleted: false,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const product = await prisma.product.create({
      data: {
        title: data.title.trim(),
        description: data.description.trim(),
        price: data.price,
        stock: data.stock,
        status: data.status,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
      },
    });

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// =====================================
// Get All Products
// =====================================

export const getAllProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isDeleted: false,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// =====================================
// Get Product By ID
// =====================================

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

// =====================================
// Update Product
// =====================================

export const updateProduct = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    price?: number;
    stock?: number;
    status?: ProductStatus;
    categoryId?: string;
  }
) => {
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    if (data.price !== undefined && data.price < 0) {
      throw new Error("Price cannot be negative");
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw new Error("Stock cannot be negative");
    }

    // If category is being changed, check new category
    if (
      data.categoryId &&
      data.categoryId !== existingProduct.categoryId
    ) {
      const category = await prisma.category.findFirst({
        where: {
          id: data.categoryId,
          isDeleted: false,
        },
      });

      if (!category) {
        throw new Error("Category not found");
      }
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...(data.title !== undefined && {
          title: data.title.trim(),
        }),

        ...(data.description !== undefined && {
          description: data.description.trim(),
        }),

        ...(data.price !== undefined && {
          price: data.price,
        }),

        ...(data.stock !== undefined && {
          stock: data.stock,
        }),

        ...(data.status !== undefined && {
          status: data.status,
        }),

        ...(data.categoryId !== undefined && {
          categoryId: data.categoryId,
        }),
      },
      include: {
        category: true,
      },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// =====================================
// Soft Delete Product
// =====================================

export const deleteProduct = async (id: string) => {
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const deletedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    return deletedProduct;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};