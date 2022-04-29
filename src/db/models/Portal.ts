import { BelongsToMany, HasMany, Table } from 'sequelize-typescript';
import { Affiliate, PortalUser, PortalUserRole, User } from '.';
import _Model from './_Model';

import type { PortalAttributes } from './Portal.types';

@Table
class Portal extends _Model<PortalAttributes> {
  @HasMany(() => Affiliate)
  affiliates: Affiliate[];

  @BelongsToMany(() => User, () => PortalUser)
  users: User[];

  @HasMany(() => PortalUserRole)
  userRoles: PortalUserRole[];
}

export default Portal;
