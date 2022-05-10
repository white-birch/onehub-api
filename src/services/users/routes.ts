import { Router } from 'express';
import httpContext from 'express-http-context';
import { nextOnError } from '../../middleware';
import { signIn, signUp } from './handlers';

import type { TokenContext } from 'types';

const COOKIE_OPTIONS = Object.freeze({ httpOnly: true, secure: process.env.NODE_ENV === 'production' });

const router = Router();

router.get(
  '/auth/me',
  nextOnError(async (req, res) => {
    try {
      const { value: token, payload } = (httpContext.get('token') as TokenContext | undefined) || {};

      if (!token) {
        res.status(200).json({});
        return;
      }

      res.status(200).json({ token, ...payload });
    } catch (error) {
      res.clearCookie('token', COOKIE_OPTIONS);
      throw error;
    }
  })
);

router.post(
  '/auth/sign-in',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const organizationId = req.query.organizationId as string;
    const { token, user } = await signIn(email, password, organizationId);
    res.status(200).cookie('token', token, COOKIE_OPTIONS).json({ token, user });
  })
);

router.post(
  '/auth/sign-out',
  nextOnError(async (req, res) => {
    res.clearCookie('token', COOKIE_OPTIONS).status(200).end();
  })
);

router.post(
  '/auth/sign-up',
  nextOnError(async (req, res) => {
    const { email, password, options } = req.body;
    const { token, user } = await signUp(email, password, options);

    res.status(201).cookie('token', token, COOKIE_OPTIONS).json({ token, user });
  })
);

export default router;
