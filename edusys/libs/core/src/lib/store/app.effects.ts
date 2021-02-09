import { AuthEffects } from './auth/auth.effects';
import { ModuleEffects } from './module/module.effects';
import { PackageEffects } from './package/package.effects';

export const appEffects = [AuthEffects, ModuleEffects, PackageEffects];
