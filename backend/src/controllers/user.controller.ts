import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';
import { UserModel } from '../models/user.model.js';

const signup = async (req: Request, res: Response) => {
  // Zod validation
  const signupBody = z.object({
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
  });

  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: 'Username already taken / Incorrect inputs',
    });
  }

  // Db ops
  try {
    let { firstName, lastName, password, username } = req.body;

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(411).json({
        message: 'Username already taken',
      });
    }

    const user = await UserModel.create({
      username,
      firstName,
      lastName,
      password,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: 'Success',
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.json(error);
  }
};

const signin = async (req: Request, res: Response) => {
  // Zod validation
  const signupBody = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { success } = signupBody.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: 'Incorrect inputs',
    });
  }

  // Db ops
  try {
    let { username, password } = req.body;

    const existingUser = await UserModel.findOne({ username });

    if (!existingUser) {
      return res.status(411).json({
        message: 'Please signup first',
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET as string
    );

    res.status(200).json({
      message: 'Success',
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.json(error);
  }
};

const updateProfile = async (req: Request, res: Response) => {};

export { signin, signup, updateProfile };
