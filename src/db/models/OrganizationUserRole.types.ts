import { Role } from 'types';

export interface OrganizationUserRoleAttributes {
  id?: string;
  organizationId: string;
  userId: string;
  role: Role;
}
