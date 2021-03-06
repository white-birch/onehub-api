import { string } from 'yup';
import { Invite, Organization, Plan, User } from '../db';
import ErrorCode from './errorCodes';

export { default as validate } from './validate';

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

export const name = { name: string().typeError(ErrorCode.NameInvalid).required(ErrorCode.NameRequired) };

export const email = { email: string().typeError(ErrorCode.EmailInvalid).email(ErrorCode.EmailInvalid).required(ErrorCode.EmailRequired) };

export const password = {
  password: string().typeError(ErrorCode.PasswordInvalid).matches(PASSWORD_REGEX, ErrorCode.PasswordInvalid).required(ErrorCode.PasswordRequired),
};

export const apiKey = {
  apiKey: string().typeError(ErrorCode.ApiKeyInvalid).uuid(ErrorCode.ApiKeyInvalid).required(ErrorCode.ApiKeyRequired),
};

export const organizationId = {
  organizationId: string()
    .typeError(ErrorCode.OrganizationIdInvalid)
    .uuid(ErrorCode.OrganizationIdInvalid)
    .test({
      name: 'valid-organization-id',
      message: ErrorCode.OrganizationIdInvalid,
      test: async (value) => !!(await Organization.findByPk(value)),
    })
    .required(ErrorCode.OrganizationIdRequired),
};

export const planId = {
  planId: string()
    .typeError(ErrorCode.PlanIdInvalid)
    .uuid(ErrorCode.PlanIdInvalid)
    .test({
      name: 'valid-plan-id',
      message: ErrorCode.PlanIdInvalid,
      test: async (value) => !!(await Plan.findByPk(value)),
    })
    .required(ErrorCode.PlanIdRequired),
};

export const userId = {
  userId: string()
    .typeError(ErrorCode.UserIdInvalid)
    .uuid(ErrorCode.UserIdInvalid)
    .test({
      name: 'valid-user-id',
      message: ErrorCode.UserIdInvalid,
      test: async (value) => !!(await User.findByPk(value)),
    })
    .required(ErrorCode.UserIdRequired),
};

export const inviteCode = {
  code: string()
    .typeError(ErrorCode.InviteCodeInvalid)
    .test({
      name: 'valid-invite-code',
      message: ErrorCode.InviteCodeTaken,
      test: async function (value) {
        const isUpdatingInvite = !!this.parent.id;
        const invite = await Invite.findOne({ where: { code: value?.toUpperCase(), organizationId: this.parent.organizationId } });

        if (!invite) return true;
        if (!isUpdatingInvite) return false;
        return invite.id === this.parent.id;
      },
    })
    .required(ErrorCode.InviteCodeRequired),
};
