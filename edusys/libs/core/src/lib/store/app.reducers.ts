import { appReducer } from './app/app.reducer';
import { authReducer } from './auth/auth.reducer';
import { fileReducer } from './file/file.reducer';
import { logReducer } from './log/log.reducer';
import { moduleReducer } from './module/module.reducer';
import { organizationRoleReducer } from './organization-role/organization-role.reducer';
import { organizationReducer } from './organization/organization.reducer';
import { packageReducer } from './package/package.reducer';
import { taskReducer } from './task/task.reducer';
import { userReducer } from './user/user.reducer';

export const appReducers = {
  app: appReducer,
  auth: authReducer,
  module: moduleReducer,
  organization: organizationReducer,
  organizationRole: organizationRoleReducer,
  package: packageReducer,
  task: taskReducer,
  file: fileReducer,
  user: userReducer,
  log: logReducer,
};
