import type { Request, Response } from 'express';
import { Account } from '../models/bank.model.js';

/* ----------------------------- FETCH BALANCE --------------------------- */
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

/* ----------------------------- TRANSFER FUNDS --------------------------- */
// const transfer = async (req: Request, res: Response) => {
//   const { to, amount } = req.body;
//   const session = await mongoose.startSession();
//   const userId = req.userId;

//   session.startTransaction();

//   // Check balance and account
//   const account = await Account.findOne({ userId: userId as string }).session(
//     session
//   );

//   if (!account || account.balance < amount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: 'Insufficient balance',
//     });
//   }

//   const toAccount = await Account.findOne({ userId: to })

//   if (!toAccount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: 'Invalid account',
//     });
//   }

//   // Perform the transfer
//   await Account.updateOne(
//     { userId: userId as any },
//     { $inc: { balance: -amount } }
//   )
//   await Account.updateOne(
//     { userId: to },
//     { $inc: { balance: amount } }
//   )

//   // Commit the transaction
//   await session.commitTransaction();
//   res.json({
//     message: 'Transfer successful',
//   });
// };

const transfer = async (req: Request, res: Response) => {
  const { to, amount } = req.body;
  const userId = req.userId;

  // Check balance and account
  const account = await Account.findOne({ userId: userId as string });

  if (!account || account.balance < amount) {
    return res.status(400).json({
      message: 'Insufficient balance',
    });
  }

  const toAccount = await Account.findOne({ userId: to });

  if (!toAccount) {
    return res.status(400).json({
      message: 'Invalid account',
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: userId as any },
    { $inc: { balance: -amount } }
  );
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } });

  // Commit the transaction
  res.json({
    message: 'Transfer successful',
  });
};

export { getBalance, transfer };
