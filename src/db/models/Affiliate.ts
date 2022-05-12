import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Table } from 'sequelize-typescript';
import _Model from './_Model';
import { AffiliateAddress, AffiliateTrack, AffiliateUser, Organization, Track, AffiliateUserRole, Invite, AffiliateInvite } from '.';

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

  @ForeignKey(() => Organization)
  organizationId!: string;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsToMany(() => User, () => AffiliateUser)
  users: User[];

  @BelongsToMany(() => Track, () => AffiliateTrack)
  tracks: Track[];

  @HasMany(() => AffiliateUserRole)
  userRoles: AffiliateUserRole[];

  @BelongsToMany(() => Invite, () => AffiliateInvite)
  invites: Invite[];
}

export default Affiliate;
