import { string } from 'yup';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().matches(/^\d+$/, ErrorCode.IdInvalid).typeError(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };
