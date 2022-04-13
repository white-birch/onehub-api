import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Affiliate, AffiliateUser } from '.';

import type { User as UserAttributes } from '../../../types';

@Table
class User extends Model<UserAttributes> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  _id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING })
  role: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];
}

export default User;
