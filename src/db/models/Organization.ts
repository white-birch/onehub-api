import { BelongsToMany, Column, DataType, HasMany, HasOne, Table } from 'sequelize-typescript';
import _Model from './_Model';
import { Address, Invite, OrganizationUser, OrganizationUserRole, Track, User } from '.';

import type { OrganizationAttributes } from './Organization.types';

@Table
class Organization extends _Model<OrganizationAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column(DataType.STRING)
  website: string;

  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
  apiKey: string;

  @HasOne(() => Address)
  address: Address;

  @BelongsToMany(() => User, () => OrganizationUser)
  users: User[];

  @HasMany(() => OrganizationUserRole)
  userRoles: OrganizationUserRole[];

  @HasMany(() => Invite)
  invites: Invite[];

  @HasMany(() => Track)
  tracks: Track[];
}

export default Organization;
