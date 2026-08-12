import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const registerUser = async (data: RegisterData) => {
  const { name, email, password } = data;

  if (!name || !email || !password) {
    throw new Error("Name, email and password are required");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash Password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create User

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  // Don't return password
  const { password: _, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export default registerUser;
