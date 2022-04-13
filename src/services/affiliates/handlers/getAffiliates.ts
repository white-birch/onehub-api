import { Affiliate } from '../../../db';

const getAffiliates = async () => Affiliate.findAll();

export default getAffiliates;
