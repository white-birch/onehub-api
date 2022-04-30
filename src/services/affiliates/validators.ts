import { string } from 'yup';
import { Organization } from '../../db';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const name = { name: string().typeError(ErrorCode.NameInvalid).required(ErrorCode.NameRequired) };

export const organizationId = {
  organizationId: string()
    .typeError(ErrorCode.OrganizationIdInvalid)
    .uuid(ErrorCode.OrganizationIdInvalid)
    .test({
      name: 'is-valid-organization-id',
      message: ErrorCode.OrganizationIdInvalid,
      test: async (value) => !!(await Organization.findByPk(value)),
    })
    .required(ErrorCode.OrganizationIdRequired),
};
