import { Portal, User, PortalUserRole } from '../../../db';

import type { PortalRole } from '../../../types';

const addPortalRoleToUser = async (portal: Portal, user: User, role: PortalRole) => {
  const portalUserRole = new PortalUserRole({ role, portalId: portal.id, userId: user.id });
  await portalUserRole.save();
};

export default addPortalRoleToUser;
