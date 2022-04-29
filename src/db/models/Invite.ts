import { BelongsTo, Column, DataType, Table } from 'sequelize-typescript';
import _Model from './_Model';
import { Affiliate, Portal } from '.';

import type { InviteType } from 'types';
import type { InviteAttributes } from '.';

@Table
class Invite extends _Model<InviteAttributes> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  code!: string;

  @Column(DataType.STRING)
  invitableType!: InviteType;

  @Column(DataType.UUID)
  invitableId!: string;

  @BelongsTo(() => Portal, { foreignKey: 'invitableId', constraints: false })
  portal: Portal;

  @BelongsTo(() => Affiliate, { foreignKey: 'invitableId', constraints: false })
  affiliate: Affiliate;
}

export default Invite;
