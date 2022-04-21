import { object, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { BadRequestError } from '../errors';
import logger from './logger';

const validate = <Type>(schemaInput: ObjectShape | ObjectShape[], obj: Partial<Type>) => {
  try {
    const schema = Array.isArray(schemaInput) ? schemaInput.reduce((acc, input) => ({ ...acc, ...input }), {}) : schemaInput;
    object(schema).validateSync(obj, { abortEarly: false });
    return [];
  } catch (error) {
    if (error instanceof ValidationError) {
      logger.warn({ message: 'Validation Error(s)', error: error.errors });
      throw new BadRequestError(error.errors);
    }

    throw error;
  }
};

export default validate;
