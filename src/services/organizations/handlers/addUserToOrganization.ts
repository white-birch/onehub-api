import { User, Organization, OrganizationUserRole } from '../../../db';
import { Role } from '../../../types';

const addUserToOrganization = async (organization: Organization, user: User, role: Role) => {
  await Promise.all([
    user.$add('organizations', organization),
    () => {
      const organizationUserRole = new OrganizationUserRole({ role, organizationId: organization.id, userId: user.id });
      return organizationUserRole.save();
    },
  ]);
};

export default addUserToOrganization;
