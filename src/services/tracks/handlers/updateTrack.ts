import * as validators from '../../../utils/validators';
import getTrack from './getTrack';

import type { TrackAttributes } from 'db';

const updateTrack = async (trackId: string, { id, ...data }: TrackAttributes, organizationId: string) => {
  await validators.validate([validators.name], data);

  const track = await getTrack(trackId, organizationId);
  return track.update(data);
};

export default updateTrack;
