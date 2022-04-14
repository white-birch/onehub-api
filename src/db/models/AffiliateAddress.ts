import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Affiliate } from '.';

import type { Address } from '../../types';

@Table
class AffiliateAddress extends Model<Address> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  _id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  streetAddress!: string;

  @Column(DataType.STRING)
  additionalStreetAddress: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  state!: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @BelongsTo(() => Affiliate)
  affiliate: Affiliate;
}

export default AffiliateAddress;
