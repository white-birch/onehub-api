import { Router } from 'express';
import { nextOnError } from '../../middleware';
import { signIn, signUp } from './handlers';

const router = Router();

router.post(
  '/auth/sign-in',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await signIn(email, password);
    res.status(200).cookie('token', token).json({ token, user });
  })
);

router.post(
  '/auth/sign-up',
  nextOnError(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await signUp(email, password);
    res.status(200).cookie('token', token).json({ token, user });
  })
);

export default router;
