import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Organization, User } from '.';
import _Model from './_Model';

import type { OrganizationRole } from 'types';
import type { OrganizationUserRoleAttributes } from './OrganizationUserRole.types';

@Table
class OrganizationUserRole extends _Model<OrganizationUserRoleAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  role: OrganizationRole;

  @ForeignKey(() => Organization)
  organizationId!: string;

  @ForeignKey(() => User)
  userId!: string;

  @BelongsTo(() => Organization)
  organization: Organization;

  @BelongsTo(() => User)
  user: User;
}

export default OrganizationUserRole;
