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

const User = mongoose.model<User>('User', schema);

export const create = async (user: User): Promise<User> => User.create(user);

export const deleteById = async (_id: string): Promise<void> => {
  await User.findByIdAndDelete(_id).exec();
};

export const find = async (user: Partial<User>): Promise<User[]> => {
  const users = await User.find(user);
  return users.map((u) => u.toJSON({ versionKey: false }));
};

export const findById = async (_id: string | undefined): Promise<User | undefined> => {
  const user = await User.findById(_id);
  return user ? user.toJSON({ versionKey: false }) : undefined;
};

export const update = async (user: User): Promise<User | undefined> => {
  const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true });
  return updatedUser ? updatedUser.toJSON({ versionKey: false }) : undefined;
};
