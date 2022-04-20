import { Portal } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

type Options = Parameters<typeof Portal.findByPk>[1];

const getPortal = async (portalId: string, options?: Options) => {
  validators.validate(validators.id, { id: portalId });

  const portal = await Portal.findByPk(portalId, options);

  if (!portal) {
    logger.warn({ message: 'Portal not found', portalId });
    throw new NotFoundError();
  }

  return portal;
};

export default getPortal;
