import { Router } from 'express';
import { authMiddleware, authAddOns, nextOnError } from '../../middleware';
import { createAffiliate, deleteAffiliate, getAffiliate, getAffiliates, updateAffiliate } from './handlers';

import type { Affiliate } from 'types';

const { authorizeUserManagement } = authAddOns;

const router = Router();

router.get(
  '/affiliates',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const affiliates = await getAffiliates();
    res.status(200).json(affiliates);
  })
);

router.get(
  '/affiliates/:affiliateId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const affiliate = await getAffiliate(req.params.affiliateId);
    res.status(200).json(affiliate);
  })
);

router.post(
  '/affiliates/',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const affiliate: Affiliate = { name: req.body.name };
    await createAffiliate(affiliate);
    res.sendStatus(201);
  })
);

router.put(
  '/affiliates/:affiliateId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const user: Affiliate = { name: req.body.name };
    await updateAffiliate({ ...user, _id: req.params.affiliateId });
    res.sendStatus(200);
  })
);

router.delete(
  '/affiliates/:affiliateId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    await deleteAffiliate(req.params.affiliateId);
    res.sendStatus(200);
  })
);

export default router;
