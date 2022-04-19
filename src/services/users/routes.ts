import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { signIn, signUp, createUser, deleteUser, getUser, getUsers, updateUser } from './handlers';

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

router.get(
  '/users',
  authMiddleware(),
  nextOnError(async (_req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
  })
);

router.get(
  '/users/:userId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const user = await getUser(req.params.userId);
    res.status(200).json(user);
  })
);

router.post(
  '/users/',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const user = await createUser(req.body);
    res.status(201).json(user);
  })
);

router.put(
  '/users/:userId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const user = await updateUser({ ...req.body, id: req.params.userId });
    res.status(200).json(user);
  })
);

router.delete(
  '/users/:userId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    await deleteUser(req.params.userId);
    res.sendStatus(200);
  })
);

export default router;
