import { sign } from '../../../utils/crypto';

import type { User } from 'db';

const signToken = async (user: User, organizationId?: string) => {
  return sign({
    userId: user.id,
    isOrganizationAdmin: organizationId ? await user.isOrganizationAdmin(organizationId) : false,
  });
};

export default signToken;
