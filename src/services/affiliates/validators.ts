import { object, string, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { BadRequestError } from '../../errors';
import ErrorCode from '../../utils/errorCodes';

export const validate = <Type>(schema: ObjectShape, user: Partial<Type>) => {
  try {
    object(schema).validateSync(user, { abortEarly: false });
    return [];
  } catch (error) {
    if (error instanceof ValidationError) {
      console.warn('Validation error(s)', error.errors);
      throw new BadRequestError(error.errors);
    }

    throw error;
  }
};

export const _id = { _id: string().required(ErrorCode.IdRequired) };

export const name = { name: string().required(ErrorCode.NameRequired) };
