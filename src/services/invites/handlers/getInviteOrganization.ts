import { Affiliate, Invite, Organization } from '../../../db';
import { InviteType } from '../../../types';

const getInviteOrganization = async (invite: Invite) => {
  if (invite.type === InviteType.Organization) {
    const organization = await Organization.findByPk(invite.id);

    if (!organization) {
      throw new Error(`Attempted to get invite organization for unknown organization id ${invite.id}`);
    }

    return organization;
  }

  if (invite.type === InviteType.Affiliate) {
    const affiliate = await Affiliate.findByPk(invite.id, { include: [Organization] });

    const organization = affiliate?.organization;

    if (!organization) {
      throw new Error(`Attempted to get invite organization for unknown affiliate id ${invite.id}`);
    }

    return organization;
  }

  throw new Error(`Attempted to get invite for unknown invite type ${invite.type}`);
};

export default getInviteOrganization;
