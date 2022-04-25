import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { AffiliateRole, PortalRole } from '../../types';
import { Affiliate, AffiliateUser, AffiliateUserRole, PortalUserRole } from '.';
import _Model from './_Model';

import type { UserAttributes } from './User.types';
import Portal from './Portal';

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

  @BelongsToMany(() => Affiliate, () => AffiliateUser)
  affiliates: Affiliate[];

  @HasMany(() => AffiliateUserRole)
  affiliateUserRoles: AffiliateUserRole[];

  @HasMany(() => PortalUserRole)
  portalUserRoles: PortalUserRole[];

  getPassword(): string {
    return this.getDataValue('password');
  }

  isAffiliateAdmin(affiliateId: string) {
    return this.affiliateUserRoles.some((affiliateUserRole) => affiliateUserRole.affiliateId === affiliateId && affiliateUserRole.role === AffiliateRole.Admin);
  }

  isPortalAdmin(portalId: string) {
    return this.portalUserRoles.some((portalUserRole) => portalUserRole.portalId === portalId && portalUserRole.role === PortalRole.Admin);
  }

  async isAffiliateOrPortalAdmin(affiliateId: string) {
    if (this.isAffiliateAdmin(affiliateId)) return true;

    const affiliate = await Affiliate.findByPk(affiliateId, { include: [Portal] });

    if (!affiliate) {
      throw new Error(`Affiliate with id ${affiliateId} not found`);
    }

    if (!affiliate.portal) {
      throw new Error(`Affiliate with id ${affiliateId} has no portal`);
    }

    return this.isPortalAdmin(affiliate.portal.id);
  }
}

export default User;
