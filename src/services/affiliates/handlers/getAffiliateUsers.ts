import * as validators from '../validators';
import getAffiliate from './getAffiliate';

const getAffiliateUsers = async (affiliateId: string) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await getAffiliate(affiliateId);
  return affiliate.$get('users');
};

export default getAffiliateUsers;
