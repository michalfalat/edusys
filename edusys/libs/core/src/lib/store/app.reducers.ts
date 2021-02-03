import { authReducer } from './auth/auth.reducer';
import { moduleReducer } from './module/module.reducer';

export const appReducers = {
  auth: authReducer,
  module: moduleReducer,
};
