import { Router } from 'express';
import httpContext from 'express-http-context';
import { User } from '../../db';
import { authMiddleware, nextOnError } from '../../middleware';
import { Role } from '../../types';
import { addAffiliateToPortal, createAffiliate, deleteAffiliate, getAffiliate, getAffiliates, getAffiliateUsers, updateAffiliate } from './handlers';
import addAffiliateToUser from './handlers/addAffiliateToUser';

const router = Router();

router.get(
  '/affiliates',
  authMiddleware(),
  nextOnError(async (_req, res) => {
    const affiliates = await getAffiliates();
    res.status(200).json(affiliates);
  })
);

router.get(
  '/affiliates/:affiliateId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const affiliate = await getAffiliate(req.params.affiliateId);
    res.status(200).json(affiliate);
  })
);

router.post(
  '/affiliates',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const affiliate = await createAffiliate(req.body);

    if (req.query.portalId) {
      await addAffiliateToPortal(affiliate.id, req.query.portalId as string);
    }

    const { user } = (httpContext.get('token') as { user: User } | undefined) || {};
    if (user) {
      await addAffiliateToUser(affiliate, user, Role.Admin);
    }

    res.status(201).json(affiliate);
  })
);

router.put(
  '/affiliates/:affiliateId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const affiliate = await updateAffiliate({ ...req.body.name, id: req.params.affiliateId });
    res.status(200).json(affiliate);
  })
);

router.delete(
  '/affiliates/:affiliateId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    await deleteAffiliate(req.params.affiliateId);
    res.sendStatus(200);
  })
);

router.put(
  '/affiliates/:affiliateId/portal/:portalId',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const { affiliateId, portalId } = req.params;
    await addAffiliateToPortal(affiliateId, portalId);
    res.sendStatus(200);
  })
);

router.get(
  '/affiliates/:affiliateId/users',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const users = await getAffiliateUsers(req.params.affiliateId);
    res.status(200).json(users);
  })
);

export default router;
