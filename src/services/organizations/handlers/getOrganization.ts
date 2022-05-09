import { Organization } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

type Options = Parameters<typeof Organization.findByPk>[1];

const getOrganization = async (organizationId: string, options?: Options) => {
  await validators.validate(validators.id, { id: organizationId });

  const organization = await Organization.findByPk(organizationId, options);

  if (!organization) {
    logger.warn({ message: 'Organization not found', organizationId });
    throw new NotFoundError();
  }

  return organization;
};

export default getOrganization;
