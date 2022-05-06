import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Affiliate } from '.';
import _Model from './_Model';

import type { AffiliateAddressAttributes } from './AffiliateAddress.types';

@Table
class AffiliateAddress extends _Model<AffiliateAddressAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  streetAddress!: string;

  @Column(DataType.STRING)
  additionalStreetAddress: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  state!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  zipCode!: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'US' })
  country!: string;

  @ForeignKey(() => Affiliate)
  affiliateId!: string;

  @BelongsTo(() => Affiliate)
  affiliate: Affiliate;
}

export default AffiliateAddress;
