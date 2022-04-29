import { BelongsToMany, HasMany, Table } from 'sequelize-typescript';
import { InviteType } from '../../types';
import _Model from './_Model';
import { Affiliate, Invite, PortalUser, PortalUserRole, User } from '.';

import type { PortalAttributes } from './Portal.types';

@Table
class Portal extends _Model<PortalAttributes> {
  @HasMany(() => Affiliate)
  affiliates: Affiliate[];

  @BelongsToMany(() => User, () => PortalUser)
  users: User[];

  @HasMany(() => PortalUserRole)
  userRoles: PortalUserRole[];

  @HasMany(() => Invite, { foreignKey: 'invitableId', scope: { invitableType: InviteType.Portal }, constraints: false })
  invites: Invite[];
}

export default Portal;
