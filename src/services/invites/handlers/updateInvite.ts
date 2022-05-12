import * as validators from '../../../utils/validators';
import getInvite from './getInvite';

import { InviteInput } from 'db';

const updateInvite = async (inviteId: string, { id, affiliateIds, ...data }: InviteInput) => {
  await validators.validate([validators.inviteCode, validators.organizationId, validators.affiliateIds], { ...data, affiliateIds, id: inviteId });

  const invite = await (await getInvite(inviteId)).update(data);
  await invite.$set('affiliates', affiliateIds || null);

  return invite;
};

export default updateInvite;
