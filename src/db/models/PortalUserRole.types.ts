import { PortalRole } from 'types';

export interface PortalUserRoleAttributes {
  id?: string;
  portalId: string;
  userId: string;
  role: PortalRole;
}
