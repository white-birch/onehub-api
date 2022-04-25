import { ForeignKey, Table } from 'sequelize-typescript';
import { Plan, Track } from '.';
import _Model from './_Model';

@Table({ tableName: 'Plan_Track' })
class PlanTrack extends _Model {
  @ForeignKey(() => Plan)
  planId!: string;

  @ForeignKey(() => Track)
  trackId!: string;
}

export default PlanTrack;
