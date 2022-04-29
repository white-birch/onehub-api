import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { AffiliateRole, InviteType, PortalRole } from '../../types';
import { Affiliate, AffiliateUser, AffiliateUserRole, PortalUser, PortalUserRole } from '.';
import _Model from './_Model';

import type { UserAttributes } from './User.types';
import Portal from './Portal';
import Membership from './Membership';

@Table
class User extends _Model<UserAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  get password(): string {
    return undefined as unknown as string;
  }

  set password(value: string) {
    this.setDataValue('password', value);
  }

  @BelongsToMany(() => Portal, () => PortalUser)
  portals: Portal[];

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];

  @HasMany(() => AffiliateUserRole)
  affiliateUserRoles: AffiliateUserRole[];

  @HasMany(() => PortalUserRole)
  portalUserRoles: PortalUserRole[];

  @HasMany(() => Membership)
  memberships: Membership[];

  getPassword(): string {
    return this.getDataValue('password');
  }

  async isAffiliateAdmin(affiliateId: string) {
    const isAdminOfAffiliate = this.affiliateUserRoles
      .filter((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId)
      .some((affiliateUserRole) => affiliateUserRole.role === AffiliateRole.Admin);

    if (isAdminOfAffiliate) return true;

    const affiliate = await Affiliate.findByPk(affiliateId, { include: [Portal] });

    if (!affiliate) {
      throw new Error(`Affiliate with id ${affiliateId} not found`);
    }

    if (!affiliate.portal) {
      throw new Error(`Affiliate with id ${affiliateId} has no portal`);
    }

    return this.isPortalAdmin(affiliate.portal.id);
  }

  isPortalAdmin(portalId: string) {
    return this.portalUserRoles
      .filter((portalUserRole) => portalUserRole.portalId === portalId)
      .some((portalUserRole) => portalUserRole.role === PortalRole.Admin);
  }

  async isAdmin(type: InviteType, id: string) {
    if (type === InviteType.Affiliate) return this.isAffiliateAdmin(id);
    if (type === InviteType.Portal) return this.isPortalAdmin(id);
    throw new Error(`Invalid type (${type}) provided when checking if user is admin`);
  }
}

export default User;
