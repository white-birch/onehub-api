import { string } from 'yup';
import { Affiliate, Invite, Portal } from '../../db';
import { InviteType } from '../../types';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const code = {
  code: string()
    .typeError(ErrorCode.CodeInvalid)
    .test({
      name: 'is-valid-invite-code-id',
      message: ErrorCode.CodeInUse,
      test: async (value) => !(await Invite.findOne({ where: { code: value } })),
    })
    .required(ErrorCode.CodeRequired),
};

export const invitableType = {
  invitableType: string()
    .typeError(ErrorCode.InvitableTypeInvalid)
    .test({
      name: 'is-valid-invitable-type',
      message: ErrorCode.InvitableTypeInvalid,
      test: (value) => Object.values(InviteType).includes(value as InviteType),
    })
    .required(ErrorCode.InvitableTypeRequired),
};

export const invitableId = {
  invitableId: string()
    .typeError(ErrorCode.InvitableIdInvalid)
    .uuid(ErrorCode.InvitableIdInvalid)
    .test({
      name: 'is-valid-invitable-id',
      message: ErrorCode.InvitableIdInvalid,
      test: async function (value) {
        if (this.parent.invitableType === InviteType.Portal) return !!(await Portal.findByPk(value));
        if (this.parent.invitableType === InviteType.Affiliate) return !!(await Affiliate.findByPk(value));
        return false;
      },
    })
    .required(ErrorCode.InvitableIdRequired),
};
