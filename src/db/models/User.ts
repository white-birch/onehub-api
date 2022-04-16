import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';
import { Affiliate, AffiliateUser } from '.';
import _Model from './_Model';

import type { Role } from 'types';
import type { UserAttributes } from './User.types';

@Table
class User extends _Model<UserAttributes> {
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
  roles: Role[];

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];

  getPassword(): string {
    return this.getDataValue('password');
  }
}

export default User;
