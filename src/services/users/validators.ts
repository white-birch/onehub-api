import { BadRequestError } from '../../errors';
import { Role } from '../../types';
import * as regex from '../../utils/regex';

export const validateUserId = (value: string | undefined, errorMessage: string) => {
  if (typeof value !== 'string' || value.length === 0) {
    const error = new BadRequestError(errorMessage);
    console.error(error);
    throw error;
  }
};

export const validateEmail = (value: string | undefined, errorMessage: string) => {
  if (!regex.EMAIL.test(value || '')) {
    const error = new BadRequestError(errorMessage);
    console.error(error);
    throw error;
  }
};

export const validatePassword = (value: string | undefined, errorMessage: string) => {
  if (!regex.PASSWORD.test(value || '')) {
    const error = new BadRequestError(errorMessage);
    console.error(error);
    throw error;
  }
};

export const validateRole = (value: Role | undefined, errorMessage: string) => {
  if (!value || !Object.values(Role).includes(value)) {
    const error = new BadRequestError(errorMessage);
    console.error(error);
    throw error;
  }
};
