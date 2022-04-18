import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { createPortal, deletePortal, getPortal, getPortalAffiliates, getPortals, updatePortal } from './handlers';

const router = Router();

router.get(
  '/portals',
  authMiddleware(),
  nextOnError(async (_req, res) => {
    const portals = await getPortals();
    res.status(200).json(portals);
  })
);

router.get(
  '/portals/:portalId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const portal = await getPortal(req.params.portalId);
    res.status(200).json(portal);
  })
);

router.post(
  '/portals',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const portal = await createPortal(req.body);
    res.status(201).json(portal);
  })
);

router.put(
  '/portals/:portalId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const portal = await updatePortal({ ...req.body.name, id: req.params.portalId });
    res.status(200).json(portal);
  })
);

router.delete(
  '/portals/:portalId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    await deletePortal(req.params.portalId);
    res.sendStatus(200);
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
