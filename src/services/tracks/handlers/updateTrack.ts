import * as validators from '../../../utils/validators';
import getTrack from './getTrack';

import type { TrackInput, User } from 'db';

const updateTrack = async (trackId: string, { id, affiliateIds, ...data }: TrackInput, user: User) => {
  await validators.validate([validators.name, validators.affiliateIds], { ...data, affiliateIds });

  const track = await (await getTrack(trackId, user)).update(data);
  await track.$set('affiliates', affiliateIds);

  return track;
};

export default updateTrack;
