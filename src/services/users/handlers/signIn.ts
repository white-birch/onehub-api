import { User } from '../../../db';
import { UnauthorizedError } from '../../../errors';
import { compare, sign } from '../../../utils/crypto';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const signIn = async (email: string, password: string) => {
  validators.validate({ ...validators.email, ...validators.password }, { email, password });

  const [user] = await User.findAll({ where: { email } });

  if (!user) {
    logger.warn({ message: 'Unknown Email Provided', email });
    throw new UnauthorizedError();
  }

  const passwordMatches = await compare(password, user.getPassword());

  if (!passwordMatches) {
    logger.warn({ message: 'Incorrect Password', email });
    throw new UnauthorizedError();
  }

  const token = await sign({ userId: user._id });
  return { token, user };
};

export default signIn;
