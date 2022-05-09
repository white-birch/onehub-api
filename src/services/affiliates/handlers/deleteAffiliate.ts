import getAffiliate from './getAffiliate';

import type { User } from '../../../db';

const deleteAffiliate = async (affiliateId: string, user: User) => {
  const affiliate = await getAffiliate(affiliateId, user);
  await affiliate.destroy();
};

export default deleteAffiliate;
