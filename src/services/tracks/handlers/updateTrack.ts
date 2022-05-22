import * as validators from '../../../utils/validators';
import getTrack from './getTrack';

import type { Track, User } from 'db';

const updateTrack = async (trackId: string, { id, ...data }: Track, user: User) => {
  await validators.validate([validators.name], data);

  const track = await getTrack(trackId, user);
  return track.update(data);
};

export default updateTrack;
