import { string } from 'yup';
import { Plan, User } from '../../db';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

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
