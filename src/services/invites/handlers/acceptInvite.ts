import { addUserToOrganization } from '../../../services/organizations/handlers';
import { Role } from '../../../types';

import type { User } from 'db';
import findInvite from './findInvite';

const acceptInvite = async (code: string, organizationId: string, user: User) => {
  const invite = await findInvite(code, organizationId);
  const organization = await invite.$get('organization');

  if (!organization) {
    throw new Error('Attempted to accept invite for non-existent organization');
  }

  await addUserToOrganization(organization, user, Role.Member);
};

export default acceptInvite;
