import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { Role } from '../../types';
import { isOrganizationAdmin } from '../../utils/auth';
import { addUserToOrganization, getOrganization } from '../organizations/handlers';
import { createUser, deleteUser, getUser, getUsers, updateUser } from './handlers';

import type { TokenContext } from 'types';

const router = Router();

router.get(
  '/users/:userId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const user = await getUser(req.params.userId, payload.organizationId);
    res.status(200).json(user);
  })
);

router.get(
  '/users',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const users = await getUsers(payload.organizationId);
    res.status(200).json(users);
  })
);

router.post(
  '/users',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const [organization, user] = await Promise.all([getOrganization(payload.organizationid), createUser(req.body)]);
    await addUserToOrganization(organization, user, Role.Member);
    res.status(201).json(user);
  })
);

router.put(
  '/users/:userId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const user = await updateUser(req.params.userId, req.body, payload.organizationId);
    res.status(200).json(user);
  })
);

router.delete(
  '/users/:userId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    await deleteUser(req.params.userId, payload.organizationId);
    res.sendStatus(200);
  })
);

export default router;
