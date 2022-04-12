import * as db from '../../../db/mongo';

const getAffiliates = async () => db.affiliates.find({});

export default getAffiliates;
