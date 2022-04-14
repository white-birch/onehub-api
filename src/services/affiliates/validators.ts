import { string } from 'yup';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const _id = { _id: string().uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const name = { name: string().required(ErrorCode.NameRequired) };
