import { Affiliate, Organization } from '../../../db';
import { addUserToAffiliate } from '../../../services/affiliates/handlers';
import { AffiliateRole } from '../../../types';
import { getInvite } from '.';

import type { User } from 'db';

const acceptAffiliateInvite = async (user: User, affiliates: Affiliate[]): Promise<void> => {
  for (const affiliate of affiliates) {
    await addUserToAffiliate(affiliate, user, AffiliateRole.Member);
  }
};

const acceptOrganizationInvite = async (user: User, organization: Organization | null): Promise<void> => {
  if (!organization) {
    throw new Error('Attempted to accept invite for non-existent organization');
  }

  const affiliates = await organization.$get('affiliates');
  return acceptAffiliateInvite(user, affiliates);
};

const acceptInvite = async (code: string, user: User) => {
  const invite = await getInvite(code);
  const [organization, affiliates] = await Promise.all([invite.$get('organization'), invite.$get('affiliates')]);
  return affiliates.length === 0 ? acceptOrganizationInvite(user, organization) : acceptAffiliateInvite(user, affiliates);
};

export default acceptInvite;
