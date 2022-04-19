import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate, User } from '.';
import _Model from './_Model';

import type { Role } from 'types';
import type { UserRoleAttributes } from './UserRole.types';

@Table
class UserRole extends _Model<UserRoleAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  role: Role;

  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @ForeignKey(() => User)
  userId!: string;

  @BelongsTo(() => Affiliate)
  affiliate: Affiliate;

  @BelongsTo(() => User)
  user: User;
}

export default UserRole;
