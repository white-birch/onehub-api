import { User, Organization, OrganizationUserRole } from '../../../db';
import { OrganizationRole } from '../../../types';

const addUserToOrganization = async (organization: Organization, user: User, options: { isAdmin: boolean } = { isAdmin: false }) => {
  await user.$add('organizations', organization);

  if (options.isAdmin) {
    const organizationUserRole = new OrganizationUserRole({ role: OrganizationRole.Admin, organizationId: organization.id, userId: user.id });
    await organizationUserRole.save();
  }
};

export default addUserToOrganization;
