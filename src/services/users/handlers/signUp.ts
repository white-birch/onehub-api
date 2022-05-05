import { createUser } from '../../users/handlers';
import signToken from './signToken';

const signUp = async (email: string, password: string) => {
  const user = await createUser({ email, password });
  const token = await signToken(user);
  return { token, user };
};

export default signUp;
