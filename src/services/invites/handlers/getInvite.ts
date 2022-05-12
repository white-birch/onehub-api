import { Invite } from '../../../db';
import { NotFoundError } from '../../../errors';

const getInvite = async (code: string) => {
  const invite = await Invite.findByPk(code.toUpperCase());

  if (!invite) {
    throw new NotFoundError();
  }

  return invite;
};

export default getInvite;
