import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Portal, User } from '.';
import _Model from './_Model';

import type { PortalRole } from 'types';
import type { PortalUserRoleAttributes } from './PortalUserRole.types';

@Table
class PortalUserRole extends _Model<PortalUserRoleAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  role: PortalRole;

  @ForeignKey(() => Portal)
  portalId!: string;

  @ForeignKey(() => User)
  userId!: string;

  @BelongsTo(() => Portal)
  portal: Portal;

  @BelongsTo(() => User)
  user: User;
}

export default PortalUserRole;
