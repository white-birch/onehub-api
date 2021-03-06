import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { isOrganizationAdmin } from '../../utils/auth';
import { createTrack, deleteTrack, getTrack, getTracks, updateTrack } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.get(
  '/tracks/:trackId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const track = await getTrack(req.params.trackId, payload.organizationId);
    res.status(200).json(track);
  })
);

router.get(
  '/tracks',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const tracks = await getTracks(payload.organizationId);
    res.status(200).json(tracks);
  })
);

router.post(
  '/tracks',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const track = await createTrack({ ...req.body, organizationId: payload.organizationId });
    res.status(201).json(track);
  })
);

router.put(
  '/tracks/:trackId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    const track = await updateTrack(req.params.trackId, req.body, payload.organizationId);
    res.status(200).json(track);
  })
);

router.delete(
  '/tracks/:trackId',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const { payload } = httpContext.get('token') as TokenContext;
    await deleteTrack(req.params.trackId, payload.organizationId);
    res.sendStatus(200);
  })
);

export default router;
