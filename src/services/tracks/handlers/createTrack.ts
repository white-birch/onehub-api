import { Track } from '../../../db';
import * as validators from '../../../utils/validators';

import type { TrackAttributes } from '../../../db';

const createTrack = async ({ id, ...data }: TrackAttributes) => {
  await validators.validate([validators.affiliateId, validators.name], data);
  const track = new Track(data);
  return track.save();
};

export default createTrack;
