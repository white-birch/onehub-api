import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { Organization, Plan, PlanTrack } from '.';
import _Model from './_Model';

import type { TrackAttributes } from './Track.types';

@Table
class Track extends _Model<TrackAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @ForeignKey(() => Organization)
  organizationId!: string;

  @BelongsTo(() => Organization)
  organization!: Organization;

  @BelongsToMany(() => Plan, () => PlanTrack)
  plans: Plan[];
}

export default Track;
