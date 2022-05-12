import { ForeignKey, Table } from 'sequelize-typescript';
import { Plan, Track } from '.';
import _Association from './_Association';

@Table({ tableName: 'Plan_Track' })
class PlanTrack extends _Association {
  @ForeignKey(() => Plan)
  planId!: string;

  @ForeignKey(() => Track)
  trackId!: string;
}

export default PlanTrack;
