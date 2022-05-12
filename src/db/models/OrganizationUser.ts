import { ForeignKey, Table } from 'sequelize-typescript';
import { User } from '.';
import Organization from './Organization';
import _Association from './_Association';

@Table({ tableName: 'Organization_User' })
class OrganizationUser extends _Association {
  @ForeignKey(() => Organization)
  organizationId!: string;

  @ForeignKey(() => User)
  userId!: string;
}

export default OrganizationUser;
