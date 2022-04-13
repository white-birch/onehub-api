import { Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Affiliate, User } from '.';

@Table({ tableName: 'Affiliate_User' })
class AffiliateUser extends Model {
  @ForeignKey(() => Affiliate)
  @Column({ type: DataType.UUID, allowNull: false })
  affiliateId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;
}

export default AffiliateUser;
