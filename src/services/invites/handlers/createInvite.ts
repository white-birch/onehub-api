import { Invite } from '../../../db';
import * as validators from '../../../utils/validators';

import type { InviteAttributes } from '../../../db';

const createInvite = async (data: InviteAttributes) => {
  await validators.validate([validators.inviteCode, validators.inviteId, validators.inviteType], data);
  const invite = new Invite(data);
  await invite.save();
};

export default createInvite;
