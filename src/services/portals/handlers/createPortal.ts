import { Portal } from '../../../db';

import type { PortalAttributes } from '../../../db';

const createPortal = async (data: PortalAttributes) => {
  const portal = new Portal(data);
  return portal.save();
};

export default createPortal;
