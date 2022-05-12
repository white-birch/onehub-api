import { Invite, InviteInput } from '../../../db';
import * as validators from '../../../utils/validators';

const createInvite = async ({ affiliateIds, ...data }: InviteInput) => {
  await validators.validate([validators.inviteCode, validators.organizationId, validators.affiliateIds], { ...data, affiliateIds });

  const invite = await new Invite({ ...data, code: data.code.toUpperCase() }).save();
  await invite.$set('affiliates', affiliateIds || null);

  return invite;
};

export default createInvite;
