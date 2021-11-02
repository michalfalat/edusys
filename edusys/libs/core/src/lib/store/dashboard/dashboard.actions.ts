import { HttpErrorResponse } from '@angular/common/http';
import { ICommonError } from '@edusys/core';
import { IDashboardResponse } from '@edusys/model';
import { createAction, props } from '@ngrx/store';

const PREFIX = '[DASHBOARD]';

// LOGIN
export const dashboardRequestAction = createAction(
  `${PREFIX} REQUEST`,
  props<{
    onSucceeded?: (response: IDashboardResponse) => void;
    onError?: (error: HttpErrorResponse | ICommonError) => void;
  }>(),
);
export const dashboardResponseAction = createAction(
  `${PREFIX} RESPONSE`,
  props<{
    response: IDashboardResponse;
  }>(),
);

// ERROR
export const dashboardErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: HttpErrorResponse | ICommonError;
  }>(),
);
