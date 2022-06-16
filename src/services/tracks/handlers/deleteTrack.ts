import getTrack from './getTrack';

const deleteTrack = async (trackId: string, organizationId: string) => {
  const track = await getTrack(trackId, organizationId);
  await track.destroy();
};

export default deleteTrack;
