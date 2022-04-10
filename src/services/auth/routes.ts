import { Router } from 'express';
import { nextOnError } from '../../middleware';
import { signIn, signUp } from './handlers';

const router = Router();

router.post(
  '/auth/sign-in',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const { role, token, userId } = await signIn(email, password);
    res.status(200).cookie('token', token).json({ role, userId });
  })
);

router.post(
  '/auth/sign-up',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const { role, token, userId } = await signUp(email, password);
    res.status(200).cookie('token', token).json({ role, userId });
  })
);

export default router;
