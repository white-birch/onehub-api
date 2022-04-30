import { ForeignKey, Table } from 'sequelize-typescript';
import { User } from '.';
import Organization from './Organization';
import _Model from './_Model';

@Table({ tableName: 'Organization_User' })
class OrganizationUser extends _Model {
  @ForeignKey(() => Organization)
  organizationId!: string;

  @ForeignKey(() => User)
  userId!: string;
}

export default OrganizationUser;
