import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { isOrganizationAdmin } from '../../utils/auth';
import { acceptInvite, createInvite, deleteInvite, getInvite, getInvites, updateInvite } from './handlers';

import type { TokenContext } from 'types';

const router = Router();

router.post(
  '/invites',
  // authMiddleware([isOrganizationAdmin]),
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
  '/invites/:id',
  // * Intentionally not auth'd so invites can be retrieved when users are signing up.
  nextOnError(async (req, res) => {
    const invite = await getInvite(req.params.id);
    res.status(200).json(invite);
  })
);

router.put(
  '/invites/:id',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const invite = await updateInvite(req.params.id, { ...req.body, organizationId: payload.organizationId });
    res.status(200).json(invite);
  })
);

router.put(
  '/invites/:code/accept',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { payload, user } = httpContext.get('token') as TokenContext;
    const invite = await acceptInvite(req.params.code, payload.organizationId, user);
    res.status(200).json(invite);
  })
);

router.delete(
  '/invites/:id',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    await deleteInvite(req.params.id);
    res.sendStatus(200);
  })
);

export default router;
