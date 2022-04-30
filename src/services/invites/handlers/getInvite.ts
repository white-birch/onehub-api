import { Invite } from '../../../db';
import * as validators from '../validators';

const getInvite = async (code: string) => {
  await validators.validate([validators.codeExists], { code });

  // * Forcing type to Invite since an exception would be thrown by the validation if the invite was not found
  return Invite.findByPk(code) as Promise<Invite>;
};

export default getInvite;
