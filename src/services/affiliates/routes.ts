import { Router } from 'express';
import { authMiddleware, authAddOns, nextOnError } from '../../middleware';
import { createAffiliate, deleteAffiliate, getAffiliate, getAffiliates, updateAffiliate } from './handlers';

const { authorizeUserManagement } = authAddOns;

const router = Router();

router.get(
  '/affiliates',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (_req, res) => {
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
    const affiliate = await createAffiliate(req.body);
    res.status(201).json(affiliate);
  })
);

router.put(
  '/affiliates/:affiliateId',
  authMiddleware([authorizeUserManagement]),
  nextOnError(async (req, res) => {
    const affiliate = await updateAffiliate({ ...req.body.name, _id: req.params.affiliateId });
    res.status(200).json(affiliate);
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
