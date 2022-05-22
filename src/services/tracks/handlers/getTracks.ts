import { Track } from '../../../db';

const getTracks = async (organizationId: string) => {
  return Track.findAll({ where: { organizationId } });
};

export default getTracks;
