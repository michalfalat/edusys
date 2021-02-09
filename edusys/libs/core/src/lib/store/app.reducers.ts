import { authReducer } from './auth/auth.reducer';
import { moduleReducer } from './module/module.reducer';
import { packageReducer } from './package/package.reducer';

export const appReducers = {
  auth: authReducer,
  module: moduleReducer,
  package: packageReducer,
};
