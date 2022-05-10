import { acceptInvite, getInvite, getInviteOrganization } from '../../invites/handlers';
import { createUser } from '../../users/handlers';
import { signToken } from '../../../utils/token';

interface SignUpOptions {
  inviteCode: string;
}

const signUp = async (email: string, password: string, options: SignUpOptions) => {
  // * Get invite first so that an error is thrown if the inviteCode is invalid
  const invite = await getInvite(options.inviteCode);

  const user = await createUser({ email, password });

  await acceptInvite(invite.code, user);
  const organizationId = (await getInviteOrganization(invite)).id;

  const token = await signToken(user, organizationId);
  return { token, user };
};

export default signUp;
