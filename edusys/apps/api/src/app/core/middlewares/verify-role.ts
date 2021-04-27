// import * as jwt from 'jsonwebtoken';
// import { Request, Response, NextFunction } from 'express';
// import { AccessForbidden } from '../utils/errors';
// import { errorLabels } from '../utils/error-labels';

// export const verifyRole = (role: AuthUserRole): any => (req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   const decodedToken = jwt.decode(token, { complete: true });
//   if (decodedToken?.['roles']?.includes(role)) next();
//   else throw new AccessForbidden(req.__(errorLabels.ACCESS_DENIED));
// };
