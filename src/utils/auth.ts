import { UnauthorizedError } from '../errors';
import logger from './logger';

import type { TokenContext } from '../types';

export type AuthAddOn = (context: TokenContext) => Promise<void>;

export const isOrganizationAdmin: AuthAddOn = async ({ user, payload }) => {
  const { organizationId } = payload;
  const isAdmin = await user.isOrganizationAdmin(organizationId);

  if (!isAdmin) {
    logger.warn({ message: 'User is not a organization admin', organizationId, userId: user.id });
    throw new UnauthorizedError();
  }
};
