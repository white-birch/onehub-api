import { BelongsTo, Column, DataType, ForeignKey, HasOne, Table } from 'sequelize-typescript';
import { AffiliateAddress, Portal } from '.';
import _Model from './_Model';

import type { AffiliateAttributes } from './Affiliate.types';

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
}

export default Affiliate;
