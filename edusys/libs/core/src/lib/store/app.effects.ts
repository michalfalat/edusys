import { AppEffects } from './app/app.effects';
import { AuthEffects } from './auth/auth.effects';
import { FileEffects } from './file/file.effects';
import { ModuleEffects } from './module/module.effects';
import { OrganizationEffects } from './organization/organization.effects';
import { PackageEffects } from './package/package.effects';
import { TaskEffects } from './task/task.effects';

export const appEffects = [AuthEffects, ModuleEffects, PackageEffects, OrganizationEffects, AppEffects, TaskEffects, FileEffects];
