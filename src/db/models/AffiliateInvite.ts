import { ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, Invite } from '.';
import _Association from './_Association';

@Table({ tableName: 'Affiliate_Invite' })
class AffiliateInvite extends _Association {
  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => Invite)
  inviteId!: string;
}

export default AffiliateInvite;
