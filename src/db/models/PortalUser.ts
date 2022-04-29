import { ForeignKey, Table } from 'sequelize-typescript';
import { User } from '.';
import Portal from './Portal';
import _Model from './_Model';

@Table({ tableName: 'Portal_User' })
class PortalUser extends _Model {
  @ForeignKey(() => Portal)
  portalId!: string;

  @ForeignKey(() => User)
  userId!: string;
}

export default PortalUser;
