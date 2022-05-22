import { Track } from '../../../db';
import * as validators from '../../../utils/validators';

import type { TrackInput } from '../../../db';

const createTrack = async ({ id, ...data }: TrackInput) => {
  await validators.validate([validators.name, validators.organizationId, validators.affiliateIds], { ...data });

  const track = await new Track(data).save();
  await track.$set('affiliates', data.affiliateIds || null);

  return track;
};

export default createTrack;
