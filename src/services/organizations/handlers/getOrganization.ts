import { Organization } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

const getOrganization = async (organizationId: string) => {
  await validators.validate(validators.id, { id: organizationId });

  const organization = await Organization.findByPk(organizationId);

  if (!organization) {
    logger.warn({ message: 'Organization not found', organizationId });
    throw new NotFoundError();
  }

  return organization;
};

export default getOrganization;
