import getTrack from './getTrack';

import type { User } from '../../../db';

const deleteTrack = async (trackId: string, user: User) => {
  const track = await getTrack(trackId, user);
  await track.destroy();
};

export default deleteTrack;
