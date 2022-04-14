import { Column, CreatedAt, DataType, DeletedAt, HasOne, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { AffiliateAddress } from '.';

import type { AffiliateAttributes } from '../../types';

@Table
class Portal extends Model<AffiliateAttributes> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  _id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column(DataType.STRING)
  website: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @HasOne(() => AffiliateAddress)
  address: AffiliateAddress;
}

export default Portal;
