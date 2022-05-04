import { Affiliate, Organization } from '../../../db';
import { addUserToAffiliate } from '../../../services/affiliates/handlers';
import { AffiliateRole, InviteType } from '../../../types';
import { getInvite } from '.';

import type { User } from 'db';

const acceptAffiliateInvite = async (user: User, affiliateId: string): Promise<void> => {
  const affiliate = await Affiliate.findByPk(affiliateId);

  if (!affiliate) {
    throw new Error(`Attempted to accept affiliate invite for unknown affiliate id ${affiliateId}`);
  }

  await addUserToAffiliate(affiliate, user, AffiliateRole.Member);
};

const acceptOrganizationInvite = async (user: User, organizationId: string): Promise<void> => {
  const organization = await Organization.findByPk(organizationId);

  if (!organization) {
    throw new Error(`Attempted to accept organization invite for unknown organization id ${organizationId}`);
  }

  const affiliates = await organization.$get('affiliates');

  for (const affiliate of affiliates) {
    await addUserToAffiliate(affiliate, user, AffiliateRole.Member);
  }
};

const acceptInvite = async (code: string, user: User) => {
  const invite = await getInvite(code);

  if (invite.type === InviteType.Organization) {
    return acceptOrganizationInvite(user, invite.id);
  }

  if (invite.type === InviteType.Affiliate) {
    return acceptAffiliateInvite(user, invite.id);
  }

  throw new Error(`Attempted to accept invite for unknown invite type ${invite.type}`);
};

export default acceptInvite;
