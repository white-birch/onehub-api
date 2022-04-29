import { User, Portal, PortalUserRole } from '../../../db';

import type { PortalRole } from '../../../types';

const addUserToPortal = async (portal: Portal, user: User, role: PortalRole) => {
  await user.$add('portals', portal);

  const portalUserRole = new PortalUserRole({ role, portalId: portal.id, userId: user.id });
  await portalUserRole.save();
};

export default addUserToPortal;
