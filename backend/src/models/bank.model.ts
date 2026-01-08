import { model, Schema } from 'mongoose';

const accountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, // Ref to User model
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: Math.ceil(Math.random() * 10000), // Seeding acc. balance
    required: true,
  },
});

const Account = model('Account', accountSchema);

export { Account };
