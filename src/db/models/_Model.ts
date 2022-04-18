import { Column, CreatedAt, DataType, DeletedAt, Model as SequelizeModel, Table, UpdatedAt } from 'sequelize-typescript';

@Table
abstract class _Model<TModelAttributes = unknown, TCreationAttributes = TModelAttributes> extends SequelizeModel<TModelAttributes, TCreationAttributes> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false, primaryKey: true })
  id!: string;

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;

  @DeletedAt
  deletionDate!: Date;
}

export default _Model;
