import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { OrganizationRole } from '../../types';
import { Affiliate, AffiliateUser, AffiliateUserRole, Membership, Organization, OrganizationUser, OrganizationUserRole } from '.';
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

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];

  @HasMany(() => AffiliateUserRole)
  affiliateUserRoles: AffiliateUserRole[];

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
      .some((organizationUserRole) => organizationUserRole.role === OrganizationRole.Admin);
  }

  async isAffiliateUser(affiliateId: string) {
    const affiliateUserRoles = await this.$get('affiliateUserRoles');
    if (!affiliateUserRoles) return false;

    const hasAffiliateUserRole = affiliateUserRoles.some((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId);
    if (hasAffiliateUserRole) return true;

    const affiliate = await Affiliate.findByPk(affiliateId);
    if (!affiliate) return false;

    return this.isOrganizationAdmin(affiliate.organizationId);
  }
}

export default User;
