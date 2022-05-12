import { ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, Invite } from '.';
import _Model from './_Model';

@Table({ tableName: 'Affiliate_Invite' })
class AffiliateInvite extends _Model {
  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => Invite)
  inviteId!: string;
}

export default AffiliateInvite;
