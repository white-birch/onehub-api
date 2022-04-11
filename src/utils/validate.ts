import { object, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { BadRequestError } from '../errors';

const validate = <Type>(schema: ObjectShape, obj: Partial<Type>) => {
  try {
    object(schema).validateSync(obj, { abortEarly: false });
    return [];
  } catch (error) {
    if (error instanceof ValidationError) {
      console.warn({ message: 'Validation Error(s)', error: error.errors });
      throw new BadRequestError(error.errors);
    }

    throw error;
  }
};

export default validate;
