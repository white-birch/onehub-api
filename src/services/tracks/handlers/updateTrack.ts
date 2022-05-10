import { mapAsync } from '../../../utils/arrayAsync';
import * as validators from '../../../utils/validators';
import { getAffiliate } from '../../affiliates/handlers';
import getTrack from './getTrack';

import type { TrackInput, User } from 'db';

const updateTrack = async (trackId: string, { id, affiliateIds, ...data }: TrackInput, user: User) => {
  await validators.validate([validators.name, validators.affiliateIds], { ...data, affiliateIds });

  const affiliates = await mapAsync(affiliateIds, (affiliateId) => getAffiliate(affiliateId, user));
  const track = await (await getTrack(trackId, user)).update(data);
  await track.$set('affiliates', affiliates);

  return track;
};

export default updateTrack;
