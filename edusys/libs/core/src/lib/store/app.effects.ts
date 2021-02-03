import { AuthEffects } from './auth/auth.effects';
import { ModuleEffects } from './module/module.effects';

export const appEffects = [AuthEffects, ModuleEffects];
