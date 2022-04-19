import { Role } from 'types';

export interface UserRoleAttributes {
  id?: string;
  affiliateId: string;
  userId: string;
  role: Role;
}
