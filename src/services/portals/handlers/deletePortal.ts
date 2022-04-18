import * as validators from '../validators';
import getPortal from './getPortal';

const deletePortal = async (portalId: string) => {
  validators.validate(validators.id, { id: portalId });

  const portal = await getPortal(portalId);

  await portal.destroy();
};

export default deletePortal;
