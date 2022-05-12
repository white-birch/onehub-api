import getInvite from './getInvite';

const deleteInvite = async (inviteId: string) => {
  const invite = await getInvite(inviteId);
  await invite.destroy();
};

export default deleteInvite;
