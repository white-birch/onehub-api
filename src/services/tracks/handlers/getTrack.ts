import { Affiliate, Track } from '../../../db';
import { ForbiddenError, NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

import type { User } from '../../../db';

const getTrack = async (trackId: string, user: User) => {
  await validators.validate(validators.id, { id: trackId });

  const track = await Track.findByPk(trackId, { include: [Affiliate] });

  if (!track) {
    logger.warn({ message: 'Track not found', trackId });
    throw new NotFoundError();
  }

  const isAuthorized = track.affiliates.some((affiliate) => user.isAffiliateUser(affiliate.id));
  if (!isAuthorized) {
    logger.warn({ message: 'User not authorized to get track', trackId });
    throw new ForbiddenError();
  }

  return track;
};

export default getTrack;
