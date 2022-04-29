import { Router } from 'express';
import { authMiddleware, nextOnError } from '../../middleware';
import { isAdmin } from '../../utils/auth';
import { createInvite, getInvite } from './handlers';

const router = Router();

router.post(
  '/invites',
  authMiddleware([isAdmin((req) => ({ type: req.body.type, id: req.body.id }))]),
  nextOnError(async (req, res) => {
    const invite = await createInvite(req.body);
    res.status(201).json(invite);
  })
);

router.get(
  '/invites/:code',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const invite = await getInvite(req.params.code);
    res.status(201).json(invite);
  })
);

export default router;
