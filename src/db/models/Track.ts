import { BelongsToMany, Column, DataType, Table } from 'sequelize-typescript';
import { AffiliateTrack, Plan, PlanTrack } from '.';
import _Model from './_Model';

import type { TrackAttributes } from './Track.types';
import Affiliate from './Affiliate';

@Table
class Track extends _Model<TrackAttributes> {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @BelongsToMany(() => Affiliate, () => AffiliateTrack)
  affiliates: Affiliate[];

  @BelongsToMany(() => Plan, () => PlanTrack)
  plans: Plan[];
}

export default Track;
