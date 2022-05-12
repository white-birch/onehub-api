import { ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, User } from '.';
import _Association from './_Association';

@Table({ tableName: 'Affiliate_User' })
class AffiliateUser extends _Association {
  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => User)
  userId!: string;
}

export default AffiliateUser;
