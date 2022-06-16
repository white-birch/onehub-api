import { User } from '../../../db';
import { NotFoundError, UnauthorizedError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

const getUser = async (userId: string, organizationId: string) => {
  await validators.validate(validators.id, { id: userId });

  const user = await User.findByPk(userId);
  if (!user) {
    logger.warn({ message: 'User not found', userId });
    throw new NotFoundError();
  }

  const isOrganizationUser = await user.isOrganizationUser(organizationId);
  if (!isOrganizationUser) {
    logger.warn({ message: 'User does not belong to organization', foundUserId: userId, organizationId });
    throw new UnauthorizedError();
  }

  return user;
};

export default getUser;
