import { HttpErrorResponse } from '@angular/common/http';
import { ICommonError } from '@edusys/core';
import isString from 'lodash-es/isString';

export const transformError = (error: string | HttpErrorResponse | ICommonError): string => {
  console.log(error);
  if (isString(error)) {
    return error;
  } else if (error['error']) {
    const httpError = error as HttpErrorResponse;
    return httpError?.error?.message?.message || httpError?.error?.message || error?.message || 'unknown.error';
  } else {
    return error?.message || 'unknown.error';
  }
};
