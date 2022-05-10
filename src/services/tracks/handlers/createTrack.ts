import { Track } from '../../../db';
import { mapAsync } from '../../../utils/arrayAsync';
import * as validators from '../../../utils/validators';
import { getAffiliate } from '../../affiliates/handlers';

import type { TrackAttributes, User } from '../../../db';

const createTrack = async ({ id, ...data }: TrackAttributes, affiliateIds: string[], user: User) => {
  await validators.validate([validators.name, validators.affiliateIds], { ...data, affiliateIds });

  const track = new Track(data);

  const affiliates = await mapAsync(affiliateIds, (affiliateId) => getAffiliate(affiliateId, user));
  for (const affiliate of affiliates) {
    await track.$add('affiliates', affiliate);
  }

  return track.save();
};

export default createTrack;
