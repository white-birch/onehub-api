import { Affiliate, User } from '../../../db';

const addAffiliateToUser = async (affiliate: Affiliate, user: User) => {
  await user.$add('affiliates', affiliate);
};

export default addAffiliateToUser;
