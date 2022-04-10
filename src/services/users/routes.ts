import { Router } from 'express';
import { authMiddleware, authAddOns, nextOnError } from '../../middleware';
import { signIn, signUp, createUser, deleteUser, getUser, getUsers, updateUser } from './handlers';

import type { User } from 'types';

const { authorizeUserManagement } = authAddOns;

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

router.get(
  '/users',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const users = await getUsers();
    res.status(200).json(users);
  })
);

router.get(
  '/users/:userId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const user = await getUser(req.params.userId);
    res.status(200).json(user);
  })
);

router.post(
  '/users/',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const user: User = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    await createUser(user);
    res.sendStatus(201);
  })
);

router.put(
  '/users/:userId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const user: User = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    await updateUser({ ...user, _id: req.params.userId });
    res.sendStatus(200);
  })
);

router.delete(
  '/users/:userId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    await deleteUser(req.params.userId);
    res.sendStatus(200);
  })
);

export default router;
