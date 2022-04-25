import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { isAffiliateOrPortalAdmin } from '../../utils/auth';
import { createPlan } from './handlers';

const router = Router();

router.post(
  '/plans',
  authMiddleware([isAffiliateOrPortalAdmin((req) => req.body.affiliateId)]),
  nextOnError(async (req, res) => {
    const plan = await createPlan(req.body);
    res.status(201).json(plan);
  })
);

export default router;
