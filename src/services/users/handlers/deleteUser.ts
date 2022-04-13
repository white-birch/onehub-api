import * as validators from '../validators';
import getUser from './getUser';

const deleteUser = async (userId: string) => {
  validators.validate(validators._id, { _id: userId });

  const user = await getUser(userId);

  await user.destroy();
};

export default deleteUser;
