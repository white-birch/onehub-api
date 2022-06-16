import { Track } from '../../../db';
import { NotFoundError, UnauthorizedError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

const getTrack = async (trackId: string, organizationId: string) => {
  await validators.validate(validators.id, { id: trackId });

  const track = await Track.findByPk(trackId);
  if (!track) {
    logger.warn({ message: 'Track not found', trackId });
    throw new NotFoundError();
  }

  const isOrganizationTrack = track.organizationId === organizationId;
  if (!isOrganizationTrack) {
    logger.warn({ message: 'Track does not belong to organization', trackId });
    throw new UnauthorizedError();
  }

  return track;
};

export default getTrack;
