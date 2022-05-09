import { Track } from '../../../db';
import { getAffiliates } from '../../affiliates/handlers';

import type { User } from 'db';

const getTracks = async (organizationId: string, user: User) => {
  const affiliates = await getAffiliates(organizationId, user);

  return Array.from(
    await affiliates.reduce(async (acc, affiliate) => {
      const tracks = await acc;
      const affiliateTracks = await affiliate.$get('tracks');
      return new Set([...tracks, ...affiliateTracks]);
    }, Promise.resolve(new Set<Track>()))
  );
};

export default getTracks;
