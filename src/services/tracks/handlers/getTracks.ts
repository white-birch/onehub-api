import { uniqBy } from 'lodash';
import { Track } from '../../../db';
import { getAffiliates } from '../../affiliates/handlers';

import type { User } from 'db';

const getTracks = async (organizationId: string, user: User) => {
  const affiliates = await getAffiliates(organizationId, user);

  return uniqBy(
    await affiliates.reduce(async (acc, affiliate) => {
      return [...(await acc), ...(await affiliate.$get('tracks'))];
    }, Promise.resolve([] as Track[])),
    'id'
  );
};

export default getTracks;
