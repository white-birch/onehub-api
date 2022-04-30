import { Organization } from '../../../db';

import type { OrganizationAttributes } from '../../../db';

const createOrganization = async ({ id, ...data }: OrganizationAttributes) => {
  const organization = new Organization(data);
  return organization.save();
};

export default createOrganization;
