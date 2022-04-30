import { User, Organization, OrganizationUserRole } from '../../../db';

import type { OrganizationRole } from '../../../types';

const addUserToOrganization = async (organization: Organization, user: User, role: OrganizationRole) => {
  await user.$add('organizations', organization);

  const organizationUserRole = new OrganizationUserRole({ role, organizationId: organization.id, userId: user.id });
  await organizationUserRole.save();
};

export default addUserToOrganization;
