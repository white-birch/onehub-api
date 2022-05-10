import { Track } from '../../../db';
import { mapAsync } from '../../../utils/arrayAsync';
import * as validators from '../../../utils/validators';
import { getAffiliate } from '../../affiliates/handlers';

import type { TrackInput, User } from '../../../db';

const createTrack = async ({ id, affiliateIds, ...data }: TrackInput, user: User) => {
  await validators.validate([validators.name, validators.affiliateIds], { ...data, affiliateIds });

  const track = await new Track(data).save();

  const affiliates = await mapAsync(affiliateIds as string[], (affiliateId) => getAffiliate(affiliateId, user));
  for (const affiliate of affiliates) {
    await track.$add('affiliates', affiliate);
  }

  return track;
};

export default createTrack;
