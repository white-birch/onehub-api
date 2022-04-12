import * as db from '../../../db/postgres';

const getAffiliates = async () => db.affiliates.find({});

export default getAffiliates;
