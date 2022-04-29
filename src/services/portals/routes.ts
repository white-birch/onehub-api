import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { PortalRole } from '../../types';
import { addUserToPortal, createPortal, getPortalAffiliates } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.post(
  '/portals',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const portal = await createPortal(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToPortal(portal, user, PortalRole.Admin);

    res.status(201).json(portal);
  })
);

router.get(
  '/portals/:portalId/affiliates',
  authMiddleware(), // No need for more detailed auth -- only affiliates the user is an admin of will be returned.
  nextOnError(async (req, res) => {
    const affiliates = await getPortalAffiliates(req.params.portalId);
    res.status(200).json(affiliates);
  })
);

export default router;
