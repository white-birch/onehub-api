import { BadRequestError } from '../../errors';

export const validateAffiliateId = (value: string | undefined, errorMessage: string) => {
  if (typeof value !== 'string' || value.length === 0) {
    const error = new BadRequestError(errorMessage);
    console.error(error);
    throw error;
  }
};

export const validateName = (value: string | undefined, errorMessage: string) => {
  if (typeof value !== 'string' || value.length === 0) {
    const error = new BadRequestError(errorMessage);
    console.error(error);
    throw error;
  }
};
