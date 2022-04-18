import * as validators from '../validators';
import getPortal from './getPortal';

const getPortalAffiliates = async (portalId: string) => {
  validators.validate(validators.id, { id: portalId });

  const portal = await getPortal(portalId);

  return portal.$get('affiliates');
};

export default getPortalAffiliates;
