import type { AddressAttributes } from './Address.types';

export interface OrganizationAttributes {
  id?: string;
  name: string;
  apiKey: string;
  website?: string;
  address?: AddressAttributes;
}
