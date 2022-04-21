import { AffiliateRole } from 'types';

export interface AffiliateUserRoleAttributes {
  id?: string;
  affiliateId: string;
  userId: string;
  role: AffiliateRole;
}
