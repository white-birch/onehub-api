import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import _Model from './_Model';
import { Affiliate, AffiliateInvite, Organization } from '.';

import type { InviteAttributes } from '.';

@Table
class Invite extends _Model<InviteAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  code!: string;

  @ForeignKey(() => Organization)
  organizationId!: string;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsToMany(() => Affiliate, () => AffiliateInvite)
  affiliates: Affiliate[];
}

export default Invite;
