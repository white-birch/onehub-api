import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Table } from 'sequelize-typescript';
import { AffiliateAddress, AffiliateUser, Portal } from '.';
import _Model from './_Model';

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
}

export default Affiliate;
