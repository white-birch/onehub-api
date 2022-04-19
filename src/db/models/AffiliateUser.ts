import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, User } from '.';
import _Model from './_Model';

@Table({ tableName: 'Affiliate_User' })
class AffiliateUser extends _Model {
  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => User)
  userId!: string;
}

export default AffiliateUser;
