import { Organization, User } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';

const getUsers = async (organizationId: string) => {
  const organization = await Organization.findByPk(organizationId, { include: [User] });

  if (!organization) {
    logger.warn({ message: 'Organization not found', organizationId });
    throw new NotFoundError();
  }

  return organization.users;
};

export default getUsers;
