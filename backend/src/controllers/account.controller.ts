import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Account } from '../models/bank.model.js';

const getBalance = async (req: Request, res: Response) => {
  const userId = req.userId; // from auth middleware

  if (!userId) {
    return res.json({
      message: 'Token expired',
    });
  }

  const accountInfo = await Account.findOne({ userId: userId as any });

  return res.json({
    balance: accountInfo?.balance,
  });
};

const transfer = async (req: Request, res: Response) => {
  const { to, amount } = req.body;
  const session = await mongoose.startSession();
  const userId = req.userId;

  // Check balance and account
  const account = await Account.findOne({ userId: userId as string }).session(
    session
  );

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: userId as any },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.json({
    message: 'Transfer successful',
  });
};

export { getBalance, transfer };
