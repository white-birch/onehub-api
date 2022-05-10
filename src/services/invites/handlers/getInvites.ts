import { uniqBy } from 'lodash';
import { Affiliate, Invite } from '../../../db';
import { InviteType } from '../../../types';
import * as validators from '../../../utils/validators';
import { getOrganization } from '../../organizations/handlers';

const getInvites = async (organizationId: string) => {
  await validators.validate(validators.organizationId, { organizationId });

  const organization = await getOrganization(organizationId, { include: [Affiliate] });

  const organizationInvites = await Invite.findAll({ where: { type: InviteType.Organization, id: organization.id } });
  const affiliateInvites = await organization.affiliates.reduce(
    async (acc, affiliate) => [...(await acc), ...(await Invite.findAll({ where: { type: InviteType.Affiliate, id: affiliate.id } }))],
    Promise.resolve([] as Invite[])
  );

  return uniqBy([...organizationInvites, ...affiliateInvites], 'id');
};

export default getInvites;
