import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { InviteType, OrganizationRole } from '../../types';
import { filterAsync, everyAsync } from '../../utils/arrayAsync';
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

  async isAffiliateAdmin(affiliateId: string) {
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

  async isAdminForInvite(type: InviteType, id: string) {
    if (type === InviteType.Affiliate) return this.isAffiliateAdmin(id);
    if (type === InviteType.Organization) return this.isOrganizationAdmin(id);
    throw new Error(`Invalid invite type (${type}) provided when checking if user is admin`);
  }

  async isTrackAdmin(trackId: string) {
    const affiliates = await this.$get('affiliates');
    if (!affiliates) return false;

    const adminAffiliates = await filterAsync<Affiliate>(affiliates, (affiliate) => this.isAffiliateAdmin(affiliate.id));

    return everyAsync<Affiliate>(adminAffiliates, async (affiliate) => {
      const affiliateTracks = await affiliate.$get('tracks');
      return affiliateTracks.some((affiliateTrack) => affiliateTrack.id === trackId);
    });
  }

  async isAffiliateUser(affiliateId: string) {
    if (await this.isAffiliateAdmin(affiliateId)) return true;

    const affiliateUserRoles = await this.$get('affiliateUserRoles');
    return affiliateUserRoles ? affiliateUserRoles.some((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId) : false;
  }
}

export default User;
