import { AffiliateUserRole, Organization, OrganizationUserRole, User } from '../../../db';
import * as validators from '../validators';
import getAffiliate from './getAffiliate';

const getAffiliateUsers = async (affiliateId: string) => {
  await validators.validate(validators.id, { id: affiliateId });

  const affiliate = await getAffiliate(affiliateId, {
    include: [{ model: Organization }, { model: User, include: [AffiliateUserRole, OrganizationUserRole] }],
  });

  return affiliate.users.map((user) => ({
    ...user.toJSON(),
    affiliateUserRoles: user.affiliateUserRoles.filter((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId).map(({ role }) => role),
    organizationUserRoles: user.organizationUserRoles
      .filter((organizationUserRole) => organizationUserRole.organizationId === affiliate.organization.id)
      .map(({ role }) => role),
  }));
};

export default getAffiliateUsers;
