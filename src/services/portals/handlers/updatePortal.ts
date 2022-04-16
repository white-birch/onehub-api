import * as validators from '../validators';
import getPortal from './getPortal';

import type { PortalAttributes } from '../../../db';

const updatePortal = async (data: PortalAttributes) => {
  validators.validate({ ...validators.id }, data);

  const portal = await getPortal(data.id as number);

  return portal.update(data);
};

export default updatePortal;
