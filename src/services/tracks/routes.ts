import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { isAffiliateAdmin, isTrackAdmin } from '../../utils/auth';
import logger from '../../utils/logger';
import { getAffiliate } from '../affiliates/handlers';
import { createTrack, deleteTrack, getTrack, getTracks, updateTrack } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.get(
  '/tracks/:trackId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    const track = await getTrack(req.params.trackId, user);
    res.status(200).json(track);
  })
);

router.get(
  '/tracks',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const organizationId = req.query.organizationId as string;
    const { user } = httpContext.get('token') as TokenContext;
    const tracks = await getTracks(organizationId, user);
    res.status(200).json(tracks);
  })
);

router.post(
  '/tracks',
  authMiddleware([isAffiliateAdmin((req) => req.body.affiliateId)]),
  nextOnError(async (req, res) => {
    const track = await createTrack(req.body);

    if (req.query.affiliateId) {
      try {
        const { user } = httpContext.get('token') as TokenContext;
        const affiliate = await getAffiliate(req.query.affiliateId as string, user);
        await track.$add('affiliates', affiliate);
      } catch (error) {
        logger.error({ message: 'Failed to add track to affiliate', affiliateId: req.query.affiliateId, trackId: track.id, error });
      }
    }

    res.status(201).json(track);
  })
);

router.put(
  '/tracks/:trackId',
  authMiddleware([isTrackAdmin((req) => req.params.trackId)]),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    const track = await updateTrack(req.params.trackId, req.body, user);
    res.status(200).json(track);
  })
);

router.delete(
  '/tracks/:trackId',
  authMiddleware([isTrackAdmin((req) => req.params.trackId)]),
  nextOnError(async (req, res) => {
    const { user } = httpContext.get('token') as TokenContext;
    await deleteTrack(req.params.trackId, user);
    res.sendStatus(200);
  })
);

export default router;
