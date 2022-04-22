import { string } from 'yup';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

/**
 * ? Password must...
 * ? - be at least 8-characters
 * ? - contain at least one lowercase letter
 * ? - contain at least one uppercase letter
 * ? - contain at least one number
 * ? - contain at least one special character
 */
const PASSWORD_REGEX = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const email = { email: string().typeError(ErrorCode.EmailInvalid).email(ErrorCode.EmailInvalid).required(ErrorCode.EmailRequired) };

export const password = {
  password: string().typeError(ErrorCode.PasswordInvalid).matches(PASSWORD_REGEX, ErrorCode.PasswordInvalid).required(ErrorCode.PasswordRequired),
};

// export const roles = {
//   roles: array()
//     .typeError(ErrorCode.RolesInvalid)
//     .test('roles', ErrorCode.RolesInvalid, (value) => Array.isArray(value) && value.every((role) => Object.values(AffiliateRole).includes(role))),
// };
