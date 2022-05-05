import { Router } from 'express';
import { nextOnError } from '../../middleware';
import { signIn, signUp } from './handlers';

const router = Router();

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
