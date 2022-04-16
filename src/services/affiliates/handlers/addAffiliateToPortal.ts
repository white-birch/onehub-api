import { Affiliate, Portal } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';

const addAffiliateToPortal = async (affiliateId: string, portalId: string) => {
  const [affiliate, portal] = await Promise.all([Affiliate.findByPk(affiliateId), Portal.findByPk(portalId)]);

  if (!affiliate) {
    logger.warn({ message: 'Affiliate not found', affiliateId });
    throw new NotFoundError();
  }
  if (!portal) {
    logger.warn({ message: 'Portal not found', portalId });
    throw new NotFoundError();
  }

  await affiliate.$set('portal', portal);
};

export default addAffiliateToPortal;
