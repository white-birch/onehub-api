import * as validators from '../../../utils/validators';
import getTrack from './getTrack';

import type { TrackAttributes, User } from 'db';

const updateTrack = async (trackId: string, { id, ...data }: TrackAttributes, user: User) => {
  await validators.validate([validators.name], data);

  const affiliate = await getTrack(trackId, user);
  return affiliate.update(data);
};

export default updateTrack;
