import { string } from 'yup';
import { Portal } from '../../db';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const name = { name: string().typeError(ErrorCode.NameInvalid).required(ErrorCode.NameRequired) };

export const portalId = {
  portalId: string()
    .typeError(ErrorCode.IdInvalid)
    .uuid(ErrorCode.PortalIdInvalid)
    .test({
      name: 'is-valid-portal',
      message: ErrorCode.PortalIdInvalid,
      test: async (value) => !!(await Portal.findByPk(value)),
    })
    .required(ErrorCode.PortalIdRequired),
};
