import { Track } from '../../../db';
import * as validators from '../../../utils/validators';

import type { TrackAttributes } from '../../../db';

const createTrack = async ({ id, ...data }: TrackAttributes) => {
  await validators.validate([validators.name, validators.organizationId], data);
  return new Track(data).save();
};

export default createTrack;
