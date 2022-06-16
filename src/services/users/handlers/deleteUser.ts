import getUser from './getUser';

const deleteUser = async (userId: string, organizationId: string) => {
  const user = await getUser(userId, organizationId);
  await user.destroy();
};

export default deleteUser;
