import * as validators from '../validators';
import getAffiliate from './getAffiliate';

const deleteAffiliate = async (affiliateId: number) => {
  validators.validate(validators.id, { id: affiliateId });

  const affiliate = await getAffiliate(affiliateId);

  await affiliate.destroy();
};

export default deleteAffiliate;
