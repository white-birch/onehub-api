import { object, string, ValidationError } from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { BadRequestError } from '../../errors';
import { Role } from '../../types';
import ErrorCode from '../../utils/errorCodes';

/**
 * ? Password must...
 * ? - be at least 8-characters
 * ? - contain at least one lowercase letter
 * ? - contain at least one uppercase letter
 * ? - contain at least one number
 * ? - contain at least one special character
 */
const PASSWORD_REGEX = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

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

export const email = { email: string().email(ErrorCode.EmailInvalid).required(ErrorCode.EmailRequired) };

export const password = { password: string().matches(PASSWORD_REGEX, ErrorCode.PasswordInvalid).required(ErrorCode.PasswordRequired) };

export const role = { role: string().oneOf(Object.values(Role), ErrorCode.RoleInvalid).required(ErrorCode.RoleRequired) };
