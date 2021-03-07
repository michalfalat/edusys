import { createAction, props } from '@ngrx/store';

const PREFIX = '[APP]';

export const addPendingRequestAction = createAction(
  `${PREFIX} ADD PENDING REQUEST`,
  props<{
    id: string;
  }>()
);
export const removePendingRequestAction = createAction(
  `${PREFIX} REMOVE PENDING REQUEST`,
  props<{
    id: string;
  }>()
);

// ERROR
export const appErrorAction = createAction(
  `${PREFIX} ERROR RESPONSE`,
  props<{
    error: any;
  }>()
);
