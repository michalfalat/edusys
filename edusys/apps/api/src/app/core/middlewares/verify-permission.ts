import { Request, Response, NextFunction } from 'express';
import { AccessForbidden } from '../utils/errors';
import { getCurrentUser } from './current-http-context';
import UserModel from '../models/user.model';
import { flatten, uniq } from 'lodash';

export const verifyPermission = (permission: string): any => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const currentUser = getCurrentUser();
    const user = await UserModel.findById(currentUser?.id).populate({ path: 'activeOrganization', populate: { path: 'organizationRoles', populate: 'users' } });

    if (!user) {
      throw new AccessForbidden();
    }
    if (user.email === process.env.SU_EMAIL) {
      next();
      return;
    }
    const userRoles = user?.activeOrganization?.organizationRoles?.filter((r) => r.users?.map((u) => u.id).includes(user.id));
    if (!userRoles) {
      throw new AccessForbidden(null, { permission: 'USER-ROLE EMPTY' });
    }
    const permissions = uniq(flatten(userRoles?.map((r) => r.permissions)));
    if (!permissions?.length) {
      throw new AccessForbidden(null, { permission: 'EMPTY' });
    }

    if (permissions.includes(permission)) {
      next();
    } else {
      throw new AccessForbidden(null, { permission });
    }
  } catch (error) {
    next(error);
  }
};
