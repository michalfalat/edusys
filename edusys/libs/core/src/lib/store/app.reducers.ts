import { appReducer } from './app/app.reducer';
import { authReducer } from './auth/auth.reducer';
import { moduleReducer } from './module/module.reducer';
import { organizationReducer } from './organization/organization.reducer';
import { packageReducer } from './package/package.reducer';
import { taskReducer } from './task/task.reducer';

export const appReducers = {
  app: appReducer,
  auth: authReducer,
  module: moduleReducer,
  organization: organizationReducer,
  package: packageReducer,
  task: taskReducer,
};
