import { User } from '../../../db';
import { UnauthorizedError } from '../../../errors';
import { compare, sign } from '../../../utils/crypto';
import * as validators from '../validators';

const signIn = async (email: string, password: string) => {
  validators.validate({ ...validators.email, ...validators.password }, { email, password });

  const user = await User.findOne({ email });

  if (!user) {
    console.warn('Unknown email provided.');
    throw new UnauthorizedError();
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    console.warn(`Password is incorrect for user (${user.email}).`);
    throw new UnauthorizedError();
  }

  const role = user.role;
  const userId = user._id?.toString();
  const token = await sign({ userId });
  return { role, token, userId };
};

export default signIn;
