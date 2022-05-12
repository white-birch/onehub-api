import { Column, CreatedAt, DataType, Model as SequelizeModel, Table, UpdatedAt } from 'sequelize-typescript';

@Table
abstract class _Association<TModelAttributes = unknown, TCreationAttributes = TModelAttributes> extends SequelizeModel<TModelAttributes, TCreationAttributes> {
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false, primaryKey: true })
  id!: string;

  @CreatedAt
  creationDate!: Date;

  @UpdatedAt
  updatedOn!: Date;
}

export default _Association;
