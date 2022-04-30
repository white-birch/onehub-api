import { Router } from 'express';
import httpContext from 'express-http-context';
import { authMiddleware, nextOnError } from '../../middleware';
import { OrganizationRole } from '../../types';
import { addUserToOrganization, createOrganization, getOrganizationAffiliates } from './handlers';

import type { TokenContext } from '../../types';

const router = Router();

router.post(
  '/organizations',
  authMiddleware(),
  nextOnError(async (req, res) => {
    const organization = await createOrganization(req.body);

    const { user } = httpContext.get('token') as TokenContext;
    await addUserToOrganization(organization, user, OrganizationRole.Admin);

    res.status(201).json(organization);
  })
);

router.get(
  '/organizations/:organizationId/affiliates',
  authMiddleware(), // No need for more detailed auth -- only affiliates the user is an admin of will be returned.
  nextOnError(async (req, res) => {
    const affiliates = await getOrganizationAffiliates(req.params.organizationId);
    res.status(200).json(affiliates);
  })
);

export default router;
