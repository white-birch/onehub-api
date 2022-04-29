import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { isAdmin } from '../../utils/auth';
import { createInvite } from './handlers';

const router = Router();

router.post(
  '/invites',
  authMiddleware([isAdmin((req) => ({ type: req.body.invitableType, id: req.body.invitableId }))]),
  nextOnError(async (req, res) => {
    const membership = await createInvite(req.body);
    res.status(201).json(membership);
  })
);

export default router;
