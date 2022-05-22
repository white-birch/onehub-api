import { Invite } from '../../../db';
import * as validators from '../../../utils/validators';

const createInvite = async ({ id, ...data }: Invite) => {
  await validators.validate([validators.inviteCode, validators.organizationId], data);

  const invite = await new Invite({ ...data, code: data.code.toUpperCase() }).save();

  return invite;
};

export default createInvite;
