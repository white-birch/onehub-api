import { Affiliate, Invite, Organization } from '../../../db';
import { InviteType } from '../../../types';

const getInviteOrganization = async (invite: Invite) => {
  if (invite.type === InviteType.Organization) {
    return Organization.findByPk(invite.id);
  }

  if (invite.type === InviteType.Affiliate) {
    const affiliate = await Affiliate.findByPk(invite.id, { include: [Organization] });
    return affiliate?.organization ? affiliate.organization : null;
  }

  return null;
};

export default getInviteOrganization;
