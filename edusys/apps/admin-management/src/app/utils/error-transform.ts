import { isString } from 'lodash';

export const transformError = (error: string | any): string => {
  console.log(error);
  if (isString(error)) {
    return error;
  } else {
    return error?.error?.message?.message || error?.message || 'unknown.error';
  }
};
