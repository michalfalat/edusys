import { errorLabels } from './error-labels';

export class GeneralError extends Error {
  constructor(message?: string) {
    super();
    this.setMessage(message);
  }

  setMessage(message: string): void {
    if (!!message) {
      this.message = message;
    } else {
      if (this instanceof BadRequest) {
        this.message = errorLabels.BAD_REQUEST;
      }
      if (this instanceof NotAuthorized) {
        this.message = errorLabels.UNAUTHORIZED;
      }
      if (this instanceof AccessForbidden) {
        this.message = errorLabels.ACCESS_DENIED;
      }
      if (this instanceof NotFound) {
        this.message = errorLabels.NOT_FOUND;
      }
    }
  }

  getCode(): number {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotAuthorized) {
      return 401;
    }
    if (this instanceof AccessForbidden) {
      return 403;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

export class BadRequest extends GeneralError {}
export class NotFound extends GeneralError {}
export class NotAuthorized extends GeneralError {}
export class AccessForbidden extends GeneralError {}
