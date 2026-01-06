import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model('User', userSchema);

export { UserModel };
