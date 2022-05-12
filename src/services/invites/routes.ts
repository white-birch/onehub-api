import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { isOrganizationAdmin } from '../../utils/auth';
import { acceptInvite, createInvite, getInvite, getInvites } from './handlers';

import type { TokenContext } from 'types';

const router = Router();

router.post(
  '/invites',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const invite = await createInvite({ ...req.body, organizationId: payload.organizationId });
    res.status(201).json(invite);
  })
);

router.get(
  '/invites',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const invites = await getInvites(payload.organizationId);
    res.status(200).json(invites);
  })
);

router.get(
  '/invites/:code',
  nextOnError(async (req, res) => {
    const invite = await getInvite(req.params.code);
    res.status(200).json(invite);
  })
);

router.put(
  '/invites/:code/accept',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    const invite = await acceptInvite(req.params.code, user);
    res.status(200).json(invite);
  })
);

export default router;
