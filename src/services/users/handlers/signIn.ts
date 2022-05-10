import { User } from '../../../db';
import { UnauthorizedError } from '../../../errors';
import { compare } from '../../../utils/hash';
import logger from '../../../utils/logger';
import { signToken } from '../../../utils/token';
import * as validators from '../../../utils/validators';

const signIn = async (email: string, password: string, organizationId?: string) => {
  await validators.validate([validators.email, validators.password, validators.organizationId], { email, password, organizationId });

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

  const token = await signToken(user, organizationId as string);
  return { token, user };
};

export default signIn;
