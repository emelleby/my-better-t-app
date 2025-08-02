import { Hono } from "hono";
import bcrypt from "bcryptjs";
import { z } from "zod";
import db from "../lib/db";
import { generateToken } from "../lib/jwt";
import { registerSchema, loginSchema } from "../lib/validation";

const auth = new Hono();

// Register endpoint
auth.post("/register", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email }
    });

    if (existingUser) {
      return c.json({ error: "User already exists with this email" }, 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
      }
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    return c.json({
      message: "User registered successfully",
      user: userWithoutPassword,
      token,
    }, 201);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({
        error: "Validation failed",
        details: error.issues
      }, 400);
    }

    console.error("Registration error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Login endpoint
auth.post("/login", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await db.user.findUnique({
      where: { email: validatedData.email }
    });

    if (!user) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

    if (!isPasswordValid) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user;

    return c.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({
        error: "Validation failed",
        details: error.issues
      }, 400);
    }

    console.error("Login error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Logout endpoint (client-side token removal)
auth.post("/logout", async (c) => {
  return c.json({
    message: "Logout successful. Please remove the token from client storage."
  });
});

export default auth;