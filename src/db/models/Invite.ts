import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Affiliate, Portal } from '.';

import type { InviteType } from 'types';
import type { InviteAttributes } from '.';

@Table
class Invite extends Model<InviteAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, primaryKey: true })
  code!: string;

  @Column(DataType.STRING)
  type!: InviteType;

  @Column(DataType.UUID)
  id!: string;

  @BelongsTo(() => Portal, { foreignKey: 'id', constraints: false })
  portal: Portal;

  @BelongsTo(() => Affiliate, { foreignKey: 'id', constraints: false })
  affiliate: Affiliate;

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;

  @DeletedAt
  deletionDate!: Date;
}

export default Invite;
