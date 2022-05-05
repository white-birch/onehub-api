import { OrganizationRole } from '../../../types';
import { sign } from '../../../utils/crypto';

import type { User } from 'db';

const isOrgAdmin = async (user: User) => {
  if (user.isSuperUser) return true;

  const orgRoles = await user.$get('organizationUserRoles');
  return orgRoles.some(({ role }) => role === OrganizationRole.Admin);
};

const signToken = async (user: User) => {
  return sign({
    userId: user.id,
    isOrganizationAdmin: await isOrgAdmin(user),
  });
};

export default signToken;
