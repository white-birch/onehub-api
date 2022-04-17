import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { createPortal, deletePortal, getPortal, getPortals, updatePortal } from './handlers';

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
    const portal = await getPortal(Number(req.params.portalId));
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
    await deletePortal(Number(req.params.portalId));
    res.sendStatus(200);
  })
);

export default router;
