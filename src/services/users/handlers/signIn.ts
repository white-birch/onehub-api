import * as db from '../../../db/postgres';
import { UnauthorizedError } from '../../../errors';
import { compare, sign } from '../../../utils/crypto';
import logger from '../../../utils/logger';
import * as validators from '../validators';

const signIn = async (email: string, password: string) => {
  validators.validate({ ...validators.email, ...validators.password }, { email, password });

  const [user] = await db.users.find({ email });

  if (!user) {
    logger.warn({ message: 'Unknown Email Provided', email });
    throw new UnauthorizedError();
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    logger.warn({ message: 'Incorrect Password', email });
    throw new UnauthorizedError();
  }

  const role = user.role;
  const userId = user._id?.toString();
  const token = await sign({ userId });
  return { role, token, userId };
};

export default signIn;
