import { User } from '../../../db';
import { UnauthorizedError } from '../../../errors';
import { compare, sign } from '../../../utils/crypto';
import { validateEmail, validatePassword } from '../validators';

const signIn = async (email: string, password: string) => {
  try {
    validateEmail(email, 'Email is invalid.');
    validatePassword(password, 'Password is invalid.');

    const user = await User.findOne({ email });

    if (!user) {
      const error = new UnauthorizedError('Unknown email provided.');
      console.error(error);
      throw error;
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      const error = new UnauthorizedError(`Password is incorrect for user (${user.email}).`);
      console.error(error);
      throw error;
    }

    const role = user.role;
    const userId = user._id?.toString();
    const token = await sign({ userId });
    return { role, token, userId };
  } catch (error) {
    // Catch and rethrow a more generic UnauthorizedError so that we don't expose the underlying reason for the error.
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    throw error;
  }
};

export default signIn;
