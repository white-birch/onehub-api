import { AffiliateUserRole, Portal, PortalUserRole, User } from '../../../db';
import * as validators from '../validators';
import getAffiliate from './getAffiliate';

const getAffiliateUsers = async (affiliateId: string) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await getAffiliate(affiliateId, { include: [{ model: Portal }, { model: User, include: [AffiliateUserRole, PortalUserRole] }] });

  return affiliate.users.map((user) => ({
    ...user.toJSON(),
    affiliateUserRoles: user.affiliateUserRoles.filter((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId).map(({ role }) => role),
    portalUserRoles: user.portalUserRoles.filter((portalUserRole) => portalUserRole.portalId === affiliate.portal.id).map(({ role }) => role),
  }));
};

export default getAffiliateUsers;
