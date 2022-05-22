import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { Role } from '../../types';
import { Membership, Organization, OrganizationUser, OrganizationUserRole } from '.';
import _Model from './_Model';

import type { UserAttributes } from './User.types';

@Table
class User extends _Model<UserAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isSuperUser!: boolean;

  @Column({ type: DataType.STRING, allowNull: false })
  get password(): string {
    return undefined as unknown as string;
  }

  set password(value: string) {
    this.setDataValue('password', value);
  }

  @BelongsToMany(() => Organization, () => OrganizationUser)
  organizations: Organization[];

  @HasMany(() => OrganizationUserRole)
  organizationUserRoles: OrganizationUserRole[];

  @HasMany(() => Membership)
  memberships: Membership[];

  getPassword(): string {
    return this.getDataValue('password');
  }

  async isOrganizationAdmin(organizationId: string) {
    if (this.isSuperUser) return true;

    const organizationUserRoles = await this.$get('organizationUserRoles');

    if (!organizationUserRoles) return false;

    return organizationUserRoles
      .filter((organizationUserRole) => organizationUserRole.organizationId === organizationId)
      .some((organizationUserRole) => organizationUserRole.role === Role.Admin);
  }

  async isOrganizationUser(organizationId: string) {
    if (this.isSuperUser) return true;

    const organizationUserRoles = await this.$get('organizationUserRoles');

    if (!organizationUserRoles) return false;

    return organizationUserRoles.some((organizationUserRole) => organizationUserRole.organizationId === organizationId);
  }
}

export default User;
