import { Router } from 'express';
import { authMiddleware, authAddOns, nextOnError } from '../../middleware';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './handlers';

import type { User } from 'types';

const { authorizeUserManagement } = authAddOns;

const router = Router();

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
      _id: req.params._id,
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
