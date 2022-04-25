import { BelongsTo, ForeignKey, Table } from 'sequelize-typescript';
import { Plan, User } from '.';
import _Model from './_Model';

import type { MembershipAttributes } from './Membership.types';

@Table
class Membership extends _Model<MembershipAttributes> {
  @ForeignKey(() => Plan)
  planId!: string;

  @ForeignKey(() => User)
  userId!: string;

  @BelongsTo(() => Plan)
  plan: Plan;

  @BelongsTo(() => User)
  user: User;
}

export default Membership;
