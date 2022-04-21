import { string } from 'yup';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().uuid(ErrorCode.IdInvalid).typeError(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const name = { name: string().required(ErrorCode.NameRequired) };

export const portalId = { portalId: string().uuid(ErrorCode.PortalIdInvalid).required(ErrorCode.PortalIdRequired) };
