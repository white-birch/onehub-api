import { Portal } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getPortal = async (portalId: string) => {
  validators.validate(validators.id, { id: portalId });

  const portal = await Portal.findByPk(portalId);

  if (!portal) {
    logger.warn({ message: 'Portal not found', portalId });
    throw new NotFoundError();
  }

  return portal;
};

export default getPortal;
