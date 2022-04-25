import { BelongsToMany, Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { PlanTrack, Track } from '.';
import _Model from './_Model';

import type { PlanAttributes } from './Plan.types';
import Membership from './Membership';

@Table
class Plan extends _Model<PlanAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @BelongsToMany(() => Track, () => PlanTrack)
  tracks: Track[];

  @HasMany(() => Membership)
  memberships: Membership[];
}

export default Plan;
