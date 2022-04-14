import { BelongsToMany, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Affiliate, AffiliateUser } from '.';

import type { UserAttributes } from '../../types';

@Table
class User extends Model<UserAttributes> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, primaryKey: true })
  _id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  get password(): string {
    return undefined as unknown as string;
  }

  set password(value: string) {
    this.setDataValue('password', value);
  }

  @Column({ type: DataType.ARRAY(DataType.STRING()), allowNull: false, defaultValue: [] })
  roles: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];

  getPassword(): string {
    return this.getDataValue('password');
  }
}

export default User;
