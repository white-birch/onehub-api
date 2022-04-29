import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Table } from 'sequelize-typescript';
import { InviteType } from '../../types';
import _Model from './_Model';
import { AffiliateAddress, AffiliateTrack, AffiliateUser, Portal, Track, AffiliateUserRole, Invite } from '.';

import type { AffiliateAttributes } from './Affiliate.types';
import User from './User';

@Table
class Affiliate extends _Model<AffiliateAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column(DataType.STRING)
  website: string;

  @HasOne(() => AffiliateAddress)
  address: AffiliateAddress;

  @ForeignKey(() => Portal)
  portalId!: string;

  @BelongsTo(() => Portal)
  portal: Portal;

  @BelongsToMany(() => User, () => AffiliateUser)
  users: User[];

  @BelongsToMany(() => Track, () => AffiliateTrack)
  tracks: Track[];

  @HasMany(() => AffiliateUserRole)
  userRoles: AffiliateUserRole[];

  @HasMany(() => Invite, { foreignKey: 'invitableId', scope: { invitableType: InviteType.Portal }, constraints: false })
  invites: Invite[];
}

export default Affiliate;
