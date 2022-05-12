import { Affiliate, Invite } from '../../../db';
import { NotFoundError } from '../../../errors';
import * as validators from '../../../utils/validators';

const getInvite = async (inviteId: string) => {
  await validators.validate(validators.id, { id: inviteId });

  const invite = await Invite.findByPk(inviteId, { include: [Affiliate] });

  if (!invite) {
    throw new NotFoundError();
  }

  return invite;
};

export default getInvite;
