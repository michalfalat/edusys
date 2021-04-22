import { AppEffects } from './app/app.effects';
import { AuthEffects } from './auth/auth.effects';
import { FileEffects } from './file/file.effects';
import { LogEffects } from './log/log.effects';
import { ModuleEffects } from './module/module.effects';
import { OrganizationRoleEffects } from './organization-role/organization-role.effects';
import { OrganizationEffects } from './organization/organization.effects';
import { PackageEffects } from './package/package.effects';
import { SubscriptionEffects } from './subscription/subscription.effects';
import { TaskEffects } from './task/task.effects';
import { UserEffects } from './user/user.effects';

export const appEffects = [
  AuthEffects,
  ModuleEffects,
  PackageEffects,
  OrganizationEffects,
  AppEffects,
  TaskEffects,
  FileEffects,
  UserEffects,
  OrganizationRoleEffects,
  LogEffects,
  SubscriptionEffects,
];
