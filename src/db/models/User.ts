import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Role } from '../../types';
import { Affiliate, AffiliateUser, UserRole } from '.';
import _Model from './_Model';

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

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];

  @HasMany(() => UserRole)
  roles: UserRole[];

  getPassword(): string {
    return this.getDataValue('password');
  }

  isAffiliateAdmin(affiliateId: string) {
    return this.roles.some((userRole) => userRole.affiliateId === affiliateId && userRole.role === Role.Admin);
  }
}

export default User;
