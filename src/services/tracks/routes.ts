import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { isAffiliateOrPortalAdmin } from '../../utils/auth';
import { createTrack } from './handlers';

const router = Router();

router.post(
  '/tracks',
  authMiddleware([isAffiliateOrPortalAdmin((req) => req.body.affiliateId)]),
  nextOnError(async (req, res) => {
    const track = await createTrack(req.body);
    res.status(201).json(track);
  })
);

export default router;
