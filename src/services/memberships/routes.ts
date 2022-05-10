import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { isOrganizationAdmin } from '../../utils/auth';
import { createMembership } from './handlers';

const router = Router();

router.post(
  '/memberships',
  authMiddleware([isOrganizationAdmin]),
  nextOnError(async (req, res) => {
    const membership = await createMembership(req.body);
    res.status(201).json(membership);
  })
);

export default router;
