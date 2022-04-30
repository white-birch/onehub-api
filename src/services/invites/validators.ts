import { string } from 'yup';
import { Affiliate, Invite, Organization } from '../../db';
import { InviteType } from '../../types';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const code = {
  code: string()
    .typeError(ErrorCode.CodeInvalid)
    .test({
      name: 'is-valid-invite-code-id',
      message: ErrorCode.CodeInUse,
      test: async (value) => !(await Invite.findByPk(value)),
    })
    .required(ErrorCode.CodeRequired),
};

export const codeExists = {
  code: string()
    .typeError(ErrorCode.CodeInvalid)
    .test({
      name: 'does-invite-code-exist',
      message: ErrorCode.CodeInvalid,
      test: async (value) => !!(await Invite.findByPk(value)),
    })
    .required(ErrorCode.CodeRequired),
};

export const type = {
  type: string()
    .typeError(ErrorCode.TypeInvalid)
    .test({
      name: 'is-valid-invite-type',
      message: ErrorCode.TypeInvalid,
      test: (value) => Object.values(InviteType).includes(value as InviteType),
    })
    .required(ErrorCode.TypeRequired),
};

export const id = {
  id: string()
    .typeError(ErrorCode.IdInvalid)
    .uuid(ErrorCode.IdInvalid)
    .test({
      name: 'is-valid-invite-id',
      message: ErrorCode.IdInvalid,
      test: async function (value) {
        if (this.parent.type === InviteType.Organization) return !!(await Organization.findByPk(value));
        if (this.parent.type === InviteType.Affiliate) return !!(await Affiliate.findByPk(value));
        return false;
      },
    })
    .required(ErrorCode.IdRequired),
};
