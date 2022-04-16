import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, User } from '.';
import _Model from './_Model';

@Table({ tableName: 'Affiliate_User' })
class AffiliateUser extends _Model {
  @ForeignKey(() => Affiliate)
  @Column({ type: DataType.NUMBER, allowNull: false })
  affiliateId!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.NUMBER, allowNull: false })
  userId!: number;
}

export default AffiliateUser;
