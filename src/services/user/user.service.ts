import { error } from "node:console";
import prisma from "../../lib/prisma.js";

const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default getAllUsers;

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};



export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
  }
) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: data.name,
        email: data.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};


export const deleteUser = async (id: string) => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const deletedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isDeleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};