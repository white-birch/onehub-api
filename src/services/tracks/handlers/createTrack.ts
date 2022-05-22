import { Track } from '../../../db';
import * as validators from '../../../utils/validators';

const createTrack = async ({ id, ...data }: Track) => {
  await validators.validate([validators.name, validators.organizationId], data);
  return new Track(data).save();
};

export default createTrack;
