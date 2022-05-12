import { BelongsToMany, HasMany, Table } from 'sequelize-typescript';
import _Model from './_Model';
import { Affiliate, Invite, OrganizationUser, OrganizationUserRole, User } from '.';

import type { OrganizationAttributes } from './Organization.types';

@Table
class Organization extends _Model<OrganizationAttributes> {
  @HasMany(() => Affiliate)
  affiliates: Affiliate[];

  @BelongsToMany(() => User, () => OrganizationUser)
  users: User[];

  @HasMany(() => OrganizationUserRole)
  userRoles: OrganizationUserRole[];

  @HasMany(() => Invite)
  invites: Invite[];
}

export default Organization;
