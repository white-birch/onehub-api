import { string } from 'yup';
import { Affiliate } from '../../db';
import ErrorCode from '../../utils/errorCodes';

export { default as validate } from '../../utils/validate';

export const id = { id: string().typeError(ErrorCode.IdInvalid).uuid(ErrorCode.IdInvalid).required(ErrorCode.IdRequired) };

export const name = { name: string().typeError(ErrorCode.NameInvalid).required(ErrorCode.NameRequired) };

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
