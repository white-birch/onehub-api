import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { signIn, signUp } from './handlers';

import type { TokenContext } from 'types';

const router = Router();

router.get(
  '/auth/me',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { value: token, payload } = httpContext.get('token') as TokenContext;
    res.status(200).json({ token, ...payload });
  })
);

router.post(
  '/auth/sign-in',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const organizationId = req.query.organizationId as string | undefined;
    const { token, user } = await signIn(email, password, organizationId);
    res.status(200).cookie('token', token).json({ token, user });
  })
);

router.post(
  '/auth/sign-up',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await signUp(email, password);
    res.status(201).cookie('token', token).json({ token, user });
  })
);

export default router;
