import { User } from '../db';
import { BadRequestError, UnauthorizedError } from '../errors';
import { Role } from '../types';
import { verify } from '../utils/crypto';
import nextOnError from './nextOnError';

import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

type AuthAddOn = (req: Request, payload: JwtPayload) => void | Promise<void>;

const authMiddleware = (addOns?: AuthAddOn[]) =>
  nextOnError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token as string | undefined;

    if (!token) {
      const error = new UnauthorizedError('No token provided');
      console.warn(error);
      throw error;
    }

    let payload: string | JwtPayload | undefined;

    try {
      payload = await verify(token);
    } catch (err) {
      const error = new UnauthorizedError(`Invalid token [${err}]`);
      console.warn(error);
      throw error;
    }

    if (!payload || typeof payload === 'string') {
      const error = new UnauthorizedError(`Invalid token payload`);
      console.warn(error);
      throw error;
    }

    if (addOns) {
      for (const addOn of addOns) {
        await addOn(req, payload);
      }
    }

    next();
  });

export default authMiddleware;

export const authorizeUserOperation = async (req: Request, payload: JwtPayload) => {
  const requestedUserId = req.params.userId;
  const jwtUserId = payload.userId;

  if (!requestedUserId || !jwtUserId) {
    const error = new BadRequestError('Missing userId in request or token');
    console.warn(error);
    throw error;
  }

  if (requestedUserId === jwtUserId) {
    return;
  }

  const user = await User.findById(jwtUserId);
  const isAdmin = user?.role === Role.Admin;

  if (!isAdmin && requestedUserId !== jwtUserId) {
    const error = new UnauthorizedError(`User is not authorized to perform requested operation.`);
    console.warn(error);
    throw error;
  }
};

export const authorizeUserManagement = async (req: Request, payload: JwtPayload) => {
  const userId = payload.userId;

  if (!userId) {
    const error = new BadRequestError('Missing userId in token');
    console.warn(error);
    throw error;
  }

  const user = await User.findById(userId);

  if (!user) {
    const error = new BadRequestError('Invalid userId in token');
    console.warn(error);
    throw error;
  }

  if (![Role.Admin, Role.Manager].includes(user.role)) {
    const error = new UnauthorizedError(`User is not authorized to perform requested operation`);
    console.warn(error);
    throw error;
  }
};
