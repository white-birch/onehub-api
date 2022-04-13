import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Affiliate, User } from '.';

@Table({ tableName: 'Affiliate_User' })
class AffiliateUser extends Model {
  @ForeignKey(() => Affiliate)
  @Column({ type: DataType.UUID, allowNull: false })
  affiliateId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: number;
}

export default AffiliateUser;
