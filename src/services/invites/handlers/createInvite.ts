import { Invite } from '../../../db';
import * as validators from '../validators';

import type { InviteAttributes } from '../../../db';

const createInvite = async ({ id, ...data }: InviteAttributes) => {
  await validators.validate([validators.code, validators.invitableId, validators.invitableType], data);
  const invite = new Invite(data);
  await invite.save();
};

export default createInvite;
