import { Invite } from '../../../db';
import * as validators from '../../../utils/validators';

const getInvites = async (organizationId: string) => {
  await validators.validate(validators.organizationId, { organizationId });
  return Invite.findAll({ where: { organizationId } });
};

export default getInvites;
