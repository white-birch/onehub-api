import * as validators from '../../../utils/validators';
import getInvite from './getInvite';

import type { InviteAttributes } from 'db';

const updateInvite = async (inviteId: string, { id, ...data }: InviteAttributes) => {
  await validators.validate([validators.inviteCode, validators.organizationId], {
    ...data,
    id: inviteId, // * Adding id in so that the inviteCode validation logic will allow for the duplicate inviteCode
  });

  const invite = await getInvite(inviteId);
  return await invite.update(data);
};

export default updateInvite;
