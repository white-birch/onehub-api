import { Invite } from '../../../db';
import * as validators from '../../../utils/validators';

import type { InviteAttributes } from '../../../db';

const createInvite = async (data: InviteAttributes) => {
  await validators.validate([validators.inviteCodeExists, validators.inviteId, validators.inviteType], data);
  const invite = new Invite({ ...data, code: data.code.toUpperCase() });
  return invite.save();
};

export default createInvite;
