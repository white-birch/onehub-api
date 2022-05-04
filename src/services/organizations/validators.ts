import { string } from 'yup';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const organizationId = {
  organizationId: string().typeError(ErrorCode.OrganizationIdInvalid).uuid(ErrorCode.OrganizationIdInvalid).required(ErrorCode.OrganizationIdRequired),
};
