import { sign } from '../../../utils/crypto';
import { createUser } from '../../users/handlers';

const signUp = async (email: string, password: string) => {
  const user = await createUser({ email, password, roles: [] });
  const token = await sign({ userId: user._id });
  return { token, user };
};

export default signUp;
