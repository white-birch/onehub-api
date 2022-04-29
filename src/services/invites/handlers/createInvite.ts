import { Invite } from '../../../db';
import * as validators from '../validators';

import type { InviteAttributes } from '../../../db';

const createInvite = async (data: InviteAttributes) => {
  await validators.validate([validators.code, validators.id, validators.type], data);
  const invite = new Invite(data);
  await invite.save();
};

export default createInvite;
