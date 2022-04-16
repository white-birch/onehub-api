import { string } from 'yup';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };
