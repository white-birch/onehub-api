import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { isAffiliateAdmin } from '../../utils/auth';
import { createTrack, getTracks } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

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
    res.status(201).json(track);
  })
);

export default router;
