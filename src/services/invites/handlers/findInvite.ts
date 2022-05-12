import { Invite } from '../../../db';
import { NotFoundError } from '../../../errors';

const findInvite = async (code: string, organizationId: string) => {
  const invite = await Invite.findOne({ where: { code, organizationId } });

  if (!invite) {
    throw new NotFoundError();
  }

  return invite;
};

export default findInvite;
