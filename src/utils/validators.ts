import { string } from 'yup';
import { Affiliate, Invite, Organization, Plan, User } from '../db';
import { InviteType } from '../types';
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

export const affiliateId = {
  affiliateId: string()
    .typeError(ErrorCode.AffiliateIdInvalid)
    .uuid(ErrorCode.AffiliateIdInvalid)
    .test({
      name: 'is-valid-affiliate-id',
      message: ErrorCode.AffiliateIdInvalid,
      test: async (value) => !!(await Affiliate.findByPk(value)),
    })
    .required(ErrorCode.AffiliateIdRequired),
};

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

export const planId = {
  planId: string()
    .typeError(ErrorCode.PlanIdInvalid)
    .uuid(ErrorCode.PlanIdInvalid)
    .test({
      name: 'is-valid-plan-id',
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
      name: 'is-valid-user-id',
      message: ErrorCode.UserIdInvalid,
      test: async (value) => !!(await User.findByPk(value)),
    })
    .required(ErrorCode.UserIdRequired),
};

export const inviteCode = {
  code: string()
    .typeError(ErrorCode.InviteCodeInvalid)
    .test({
      name: 'is-valid-invite-code-id',
      message: ErrorCode.InviteCodeInUse,
      test: async (value) => !(await Invite.findByPk(value)),
    })
    .required(ErrorCode.InviteCodeRequired),
};

export const inviteCodeExists = {
  code: string()
    .typeError(ErrorCode.InviteCodeInvalid)
    .test({
      name: 'does-invite-code-exist',
      message: ErrorCode.InviteCodeInvalid,
      test: async (value) => !!(await Invite.findByPk(value)),
    })
    .required(ErrorCode.InviteCodeRequired),
};

export const inviteType = {
  type: string()
    .typeError(ErrorCode.InviteTypeInvalid)
    .test({
      name: 'is-valid-invite-type',
      message: ErrorCode.InviteTypeInvalid,
      test: (value) => Object.values(InviteType).includes(value as InviteType),
    })
    .required(ErrorCode.InviteTypeRequired),
};

export const inviteId = {
  id: string()
    .typeError(ErrorCode.InviteIdInvalid)
    .uuid(ErrorCode.InviteIdInvalid)
    .test({
      name: 'is-valid-invite-id',
      message: ErrorCode.InviteIdInvalid,
      test: async function (value) {
        if (this.parent.type === InviteType.Organization) return !!(await Organization.findByPk(value));
        if (this.parent.type === InviteType.Affiliate) return !!(await Affiliate.findByPk(value));
        return false;
      },
    })
    .required(ErrorCode.InviteIdRequired),
};
