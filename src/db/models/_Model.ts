import { CreatedAt, DeletedAt, Model as SequelizeModel, Table, UpdatedAt } from 'sequelize-typescript';

@Table
abstract class _Model<TModelAttributes = unknown, TCreationAttributes = TModelAttributes> extends SequelizeModel<TModelAttributes, TCreationAttributes> {
  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;

  @DeletedAt
  deletionDate!: Date;
}

export default _Model;
