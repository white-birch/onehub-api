import getAffiliate from './getAffiliate';

const deleteAffiliate = async (affiliateId: string) => {
  const affiliate = await getAffiliate(affiliateId);
  await affiliate.destroy();
};

export default deleteAffiliate;
