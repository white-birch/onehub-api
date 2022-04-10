import mongoose from 'mongoose';

import type { User } from 'types';

const schema = new mongoose.Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['USER', 'MANAGER', 'ADMIN'] },
  },
  { timestamps: true }
);

export default mongoose.model<User>('User', schema);
