import { acceptInvite, findInvite } from '../../invites/handlers';
import { createUser } from '../../users/handlers';
import { signToken } from '../../../utils/token';

interface SignUpOptions {
  inviteCode: string;
  organizationId: string;
}

const signUp = async (email: string, password: string, { inviteCode, organizationId }: SignUpOptions) => {
  // * Get invite first so that an error is thrown if the inviteCode is invalid
  const invite = await findInvite(inviteCode, organizationId);

  const user = await createUser({ email, password });

  await acceptInvite(inviteCode, organizationId, user);

  const token = await signToken(user, invite.organizationId);
  return { token, user };
};

export default signUp;
