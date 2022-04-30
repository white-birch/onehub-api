import { OrganizationRole } from 'types';

export interface OrganizationUserRoleAttributes {
  id?: string;
  organizationId: string;
  userId: string;
  role: OrganizationRole;
}
