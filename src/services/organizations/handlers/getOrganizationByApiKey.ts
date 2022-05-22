import { Organization } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

const getOrganizationByApiKey = async (apiKey: string) => {
  await validators.validate(validators.apiKey, { apiKey });

  const organization = await Organization.findOne({ where: { apiKey } });

  if (!organization) {
    logger.warn({ message: 'Organization not found', apiKey });
    throw new NotFoundError();
  }

  return organization;
};

export default getOrganizationByApiKey;
