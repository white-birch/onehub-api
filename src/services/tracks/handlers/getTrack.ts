import { Track } from '../../../db';
import { NotFoundError, UnauthorizedError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

import type { User } from '../../../db';

const getTrack = async (trackId: string, user: User) => {
  await validators.validate(validators.id, { id: trackId });

  const track = await Track.findByPk(trackId);
  if (!track) {
    logger.warn({ message: 'Track not found', trackId });
    throw new NotFoundError();
  }

  const isAuthorized = await user.isOrganizationUser(track.organizationId);
  if (!isAuthorized) {
    logger.warn({ message: 'User not authorized to get track', trackId });
    throw new UnauthorizedError();
  }

  return track;
};

export default getTrack;
