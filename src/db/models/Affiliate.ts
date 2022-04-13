import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { AffiliateUser, User } from '.';

import type { AffiliateAttributes } from '../../types';

@Table
class Affiliate extends Model<AffiliateAttributes> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  _id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => User, () => AffiliateUser)
  users: User[];
}

export default Affiliate;
