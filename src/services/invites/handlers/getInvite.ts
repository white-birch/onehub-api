import { Invite } from '../../../db';
import { NotFoundError } from '../../../errors';
import logger from '../../../utils/logger';
import * as validators from '../../../utils/validators';

const getInvite = async (inviteId: string) => {
  await validators.validate(validators.id, { id: inviteId });

  const invite = await Invite.findByPk(inviteId);

  if (!invite) {
    logger.warn({ message: 'Invite not found', inviteId });
    throw new NotFoundError();
  }

  return invite;
};

export default getInvite;
