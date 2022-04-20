import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { createPortal, getPortalAffiliates } from './handlers';

const router = Router();

router.post(
  '/portals',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const portal = await createPortal(req.body);
    res.status(201).json(portal);
  })
);

router.get(
  '/portals/:portalId/affiliates',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const affiliates = await getPortalAffiliates(req.params.portalId);
    res.status(200).json(affiliates);
  })
);

export default router;
