import { HasMany, Table } from 'sequelize-typescript';
import { Affiliate } from '.';
import _Model from './_Model';

import type { PortalAttributes } from './Portal.types';

@Table
class Portal extends _Model<PortalAttributes> {
  @HasMany(() => Affiliate)
  affiliates: Affiliate[];
}

export default Portal;
