import { Track } from '../../../db';
import * as validators from '../../../utils/validators';

import type { TrackInput } from '../../../db';

const createTrack = async ({ id, affiliateIds, ...data }: TrackInput) => {
  await validators.validate([validators.name, validators.affiliateIds], { ...data, affiliateIds });

  const track = await new Track(data).save();

  if (affiliateIds) {
    await track.$set('affiliates', affiliateIds);
  }

  return track;
};

export default createTrack;
