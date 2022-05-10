import { Invite } from '../../../db';
import * as validators from '../../../utils/validators';

const getInvite = async (code: string) => {
  await validators.validate([validators.inviteCodeExists], { code });

  // * Forcing type to Invite since an exception would be thrown by the validation if the invite was not found
  return Invite.findByPk(code.toUpperCase()) as Promise<Invite>;
};

export default getInvite;
