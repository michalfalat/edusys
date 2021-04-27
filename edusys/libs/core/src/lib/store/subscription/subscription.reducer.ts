import { Action, createReducer, on } from '@ngrx/store';
import { ISubscriptionDetailResponse, ISubscriptionResponse, Pagination } from '@edusys/model';
import { subscriptionDetailResponseAction, subscriptionListResponseAction } from './subscription.actions';

export default interface ISubscriptionState {
  list?: Pagination<ISubscriptionResponse>;
  detail?: ISubscriptionDetailResponse;
}

export const initialState: ISubscriptionState = {};

const _subscriptionReducer = createReducer(
  initialState,
  on(subscriptionListResponseAction, (state: ISubscriptionState, payload) => {
    return { ...state, list: payload?.response };
  }),
  on(subscriptionDetailResponseAction, (state: ISubscriptionState, payload) => {
    return { ...state, detail: payload?.response };
  }),
);

export function subscriptionReducer(state: ISubscriptionState, action: Action): any {
  return _subscriptionReducer(state, action);
}
