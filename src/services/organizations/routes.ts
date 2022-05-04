import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { addUserToOrganization, createOrganization } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.post(
  '/organizations',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const organization = await createOrganization(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToOrganization(organization, user, { isAdmin: true });

    res.status(201).json(organization);
  })
);

export default router;
