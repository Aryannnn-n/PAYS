import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { Account } from '../models/bank.model.js';
import { UserModel } from '../models/user.model.js';

/* ----------------------------- SIGNUP --------------------------- */
const signup = async (req: Request, res: Response) => {
  const signupBody = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  });

  const parsed = signupBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Invalid signup data',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  try {
    const { firstName, lastName, password, username } = parsed.data;

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        message: 'Username already exists',
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      firstName,
      lastName,
      password: hashedPass,
    });

    // Bank account creation with default balance
    await Account.create({
      userId: user._id,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      message: 'Account created successfully',
      token,
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({
      message: 'Internal server error during signup',
    });
  }
};

/* ----------------------------- SIGNIN ----------------------------- */
const signin = async (req: Request, res: Response) => {
  const signinBody = z.object({
    username: z.string(),
    password: z.string(),
  });

  const parsed = signinBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Invalid login credentials format',
    });
  }

  try {
    const { username, password } = parsed.data;

    const existingUser = await UserModel.findOne({ username }).select(
      '+password'
    );

    if (!existingUser) {
      return res.status(404).json({
        message: 'User not found. Please sign up.',
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Signin error:', error);
    return res.status(500).json({
      message: 'Internal server error during signin',
    });
  }
};

/* -------------------------- UPDATE PROFILE ------------------------- */
const updateProfile = async (req: Request, res: Response) => {
  const updateBody = z.object({
    username: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().min(6).optional(),
  });

  const parsed = updateBody.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: 'Invalid update payload',
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const userId = req.userId; // from auth middleware
  const updates = parsed.data; // safe data

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    return res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      message: 'Failed to update profile',
    });
  }
};

// /* -------------------------- FRIENDS FILTER ROUTE ------------------------- */
const filterFriends = async (req: Request, res: Response) => {
  const filter = (req.query.filter as string) || '';

  try {
    const query =
      filter.trim() === '' // If empty return all users
        ? {}
        : {
            // Otherwise search by firstName OR lastName
            $or: [
              // Match document field that CONTAINS the filter text
              {
                // $regex → partial match  -> rya -> Aryan
                // 'i' → case-insensitive (John === john)
                firstName: { $regex: filter, $options: 'i' },
              },
              {
                lastName: { $regex: filter, $options: 'i' },
              },
            ],
          };

    const users = await UserModel.find(query);

    res.status(200).json({ users });
  } catch (error) {
    console.error('Failed to find friends', error);
    res.status(500).json({ message: 'Failed to find friends' });
  }
};

export { filterFriends, signin, signup, updateProfile };
