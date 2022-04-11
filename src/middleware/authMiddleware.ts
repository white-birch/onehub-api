import { User } from '../db';
import { BadRequestError, UnauthorizedError } from '../errors';
import { Role } from '../types';
import ErrorCode from '../utils/errorCodes';
import { verify } from '../utils/crypto';
import nextOnError from './nextOnError';

import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

type AuthAddOn = (req: Request, payload: JwtPayload) => void | Promise<void>;

const authMiddleware = (addOns?: AuthAddOn[]) =>
  nextOnError(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.token as string | undefined;

    if (!token) {
      console.warn('Missing token');
      throw new UnauthorizedError();
    }

    let payload: string | JwtPayload | undefined;

    try {
      payload = await verify(token);
    } catch (err) {
      console.warn(`Invalid token [${err}]`);
      throw new UnauthorizedError();
    }

    if (!payload || typeof payload === 'string') {
      console.warn('Invalid token payload');
      throw new UnauthorizedError();
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

  if (!requestedUserId) {
    console.warn('Missing userId in request');
    throw new BadRequestError([ErrorCode.IdRequired]);
  }

  if (!jwtUserId) {
    console.warn('Missing userId in token');
    throw new BadRequestError([ErrorCode.TokenRequired]);
  }

  if (requestedUserId === jwtUserId) {
    return;
  }

  const user = await User.findById(jwtUserId);
  const isAdmin = user?.role === Role.Admin;

  if (!isAdmin && requestedUserId !== jwtUserId) {
    console.warn('User is not authorized to perform requested operation.');
    throw new UnauthorizedError();
  }
};

export const authorizeUserManagement = async (req: Request, payload: JwtPayload) => {
  const userId = payload.userId;

  if (!userId) {
    console.warn('Missing userId in token');
    throw new BadRequestError([ErrorCode.TokenRequired]);
  }

  const user = await User.findById(userId);

  if (!user) {
    console.warn('Invalid userId in token');
    throw new BadRequestError([ErrorCode.TokenInvalid]);
  }

  if (![Role.Admin, Role.Manager].includes(user.role)) {
    console.warn('User is not authorized to perform requested operation');
    throw new UnauthorizedError();
  }
};
