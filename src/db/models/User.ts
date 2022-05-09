import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { AffiliateRole, InviteType, OrganizationRole } from '../../types';
import { Affiliate, AffiliateUser, AffiliateUserRole, OrganizationUser, OrganizationUserRole } from '.';
import _Model from './_Model';

import type { UserAttributes } from './User.types';
import Organization from './Organization';
import Membership from './Membership';

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

  async isAffiliateAdmin(affiliateId: string) {
    const affiliateUserRoles = await this.$get('affiliateUserRoles');

    if (affiliateUserRoles) {
      const isAdminOfAffiliate = affiliateUserRoles
        .filter((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId)
        .some((affiliateUserRole) => affiliateUserRole.role === AffiliateRole.Admin);

      if (isAdminOfAffiliate) return true;
    }

    const affiliate = await Affiliate.findByPk(affiliateId, { include: [Organization] });

    if (!affiliate) {
      throw new Error(`Affiliate with id ${affiliateId} not found`);
    }

    if (!affiliate.organization) {
      throw new Error(`Affiliate with id ${affiliateId} has no organization`);
    }

    return this.isOrganizationAdmin(affiliate.organization.id);
  }

  async isOrganizationAdmin(organizationId: string) {
    if (this.isSuperUser) return true;

    const organizationUserRoles = await this.$get('organizationUserRoles');

    if (!organizationUserRoles) return false;

    return organizationUserRoles
      .filter((organizationUserRole) => organizationUserRole.organizationId === organizationId)
      .some((organizationUserRole) => organizationUserRole.role === OrganizationRole.Admin);
  }

  async isAdmin(type: InviteType, id: string) {
    if (type === InviteType.Affiliate) return this.isAffiliateAdmin(id);
    if (type === InviteType.Organization) return this.isOrganizationAdmin(id);
    throw new Error(`Invalid type (${type}) provided when checking if user is admin`);
  }

  async isAffiliateUser(affiliateId: string) {
    if (await this.isAffiliateAdmin(affiliateId)) return true;

    const affiliateUserRoles = await this.$get('affiliateUserRoles');
    return affiliateUserRoles ? affiliateUserRoles.some((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId) : false;
  }
}

export default User;
