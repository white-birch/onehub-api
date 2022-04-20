import { UserRole } from '../../../db';
import * as validators from '../validators';
import getAffiliate from './getAffiliate';

const getAffiliateUsers = async (affiliateId: string) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await getAffiliate(affiliateId);
  const users = await affiliate.$get('users', { include: [UserRole] });

  return users.map((user) => ({
    ...user.toJSON(),
    roles: user.roles.filter((userRole) => userRole.affiliateId === affiliateId).map(({ role }) => role),
  }));
};

export default getAffiliateUsers;
