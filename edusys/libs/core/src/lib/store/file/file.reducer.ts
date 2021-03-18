import { Action, createReducer } from '@ngrx/store';

export default interface IFileState {}

export const initialState: IFileState = {};

const _fileReducer = createReducer(initialState);

export function fileReducer(state: IFileState, action: Action): any {
  return _fileReducer(state, action);
}
