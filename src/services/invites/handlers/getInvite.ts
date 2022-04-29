import { Invite } from '../../../db';
import * as validators from '../validators';

const getInvite = async (code: string) => {
  await validators.validate([validators.codeExists], { code });
  return Invite.findByPk(code);
};

export default getInvite;
