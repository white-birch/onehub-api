import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import _Model from './_Model';

import type { AddressAttributes } from './Address.types';
import Organization from './Organization';

@Table
class Address extends _Model<AddressAttributes> {
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

  @ForeignKey(() => Organization)
  organizationId!: string;

  @BelongsTo(() => Organization)
  organization: Organization;
}

export default Address;
