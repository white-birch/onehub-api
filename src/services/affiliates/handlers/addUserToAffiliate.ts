import { Affiliate, User, AffiliateUserRole, OrganizationUserRole } from '../../../db';
import { BadRequestError } from '../../../errors';
import ErrorCode from '../../../utils/errorCodes';
import logger from '../../../utils/logger';

import { Role } from '../../../types';

const getOrganizationRoles = async (organizationId: string, user: User) => {
  const organizationRoles = await OrganizationUserRole.findAll({ where: { organizationId, userId: user.id } });
  return organizationRoles.map(({ role }) => role);
};

const isEligibleRole = (role: Role, organizationRoles: Role[]) => {
  const isOrganizationMember = organizationRoles.includes(Role.Member);
  const isOrganizationEmployee = organizationRoles.includes(Role.Employee);
  const isOrganizationAdmin = organizationRoles.includes(Role.Admin);

  switch (role) {
    case Role.Member:
      return isOrganizationMember || isOrganizationEmployee || isOrganizationAdmin;
    case Role.Employee:
      return isOrganizationEmployee || isOrganizationAdmin;
    case Role.Admin:
      return isOrganizationAdmin;
    default:
      throw new Error(`Attempting to add user to affiliate with an unrecognized role: ${role}`);
  }
};

const addUserToAffiliate = async (affiliate: Affiliate, user: User, role: Role) => {
  const organizationRoles = await getOrganizationRoles(affiliate.organizationId, user);

  if (!isEligibleRole(role, organizationRoles)) {
    logger.error({
      message: 'Unable to add user to affiliate. User does not have an eligible organization role.',
      userId: user.id,
      affiliateId: affiliate.id,
      organizationId: affiliate.organizationId,
      affiliateRole: role,
      organizationRoles,
    });
    throw new BadRequestError([ErrorCode.UserCannotBeAddedToAffiliate]);
  }

  await Promise.all([
    user.$add('affiliates', affiliate),
    () => {
      const affiliateUserRole = new AffiliateUserRole({ role, affiliateId: affiliate.id, userId: user.id });
      return affiliateUserRole.save();
    },
  ]);
};

export default addUserToAffiliate;
