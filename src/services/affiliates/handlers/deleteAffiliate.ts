import * as validators from '../validators';
import getAffiliate from './getAffiliate';

const deleteAffiliate = async (affiliateId: string) => {
  validators.validate(validators._id, { _id: affiliateId });

  const affiliate = await getAffiliate(affiliateId);

  await affiliate.destroy();
};

export default deleteAffiliate;
