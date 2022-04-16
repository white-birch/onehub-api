import * as validators from '../validators';
import getUser from './getUser';

const deleteUser = async (userId: number) => {
  validators.validate(validators.id, { id: userId });

  const user = await getUser(userId);

  await user.destroy();
};

export default deleteUser;
