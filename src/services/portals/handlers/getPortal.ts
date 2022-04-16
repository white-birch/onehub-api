import { Portal } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const getPortal = async (portalId: number) => {
  validators.validate(validators.id, { id: portalId });

  const portal = await Portal.findByPk(portalId);

  if (!portal) {
    logger.warn('Portal not found');
    throw new NotFoundError();
  }

  return portal;
};

export default getPortal;
