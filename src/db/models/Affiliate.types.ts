import type { AffiliateAddressAttributes } from './AffiliateAddress.types';

export interface AffiliateAttributes {
  id?: string;
  name: string;
  organizationId: string;
  website?: string;
  address?: AffiliateAddressAttributes;
}
