export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
export function ForbiddenErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);

  error.code = "403";
  return {
    custom: true,
    message,
    status: error.code,
  };
}

export function ConflictErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);
  error.code = "409";
  return {
    custom: true,
    message,
    status: error.code,
  };
}

export function BadRequestErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);

  error.code = "400";
  throw error;
}

export function ServerErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);

  error.code = "500";
  return {
    custom: true,
    message,
    status: error.code,
  };
}

export function NotFoundErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);

  error.code = "404";
  return {
    custom: true,
    message,
    status: error.code,
  };
}

export function UnAuthorizedErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);

  error.code = "401";
  return {
    custom: true,
    message,
    status: error.code,
  };
}

export function MethodNotAllowedErrorException(message: string) {
  const error: NodeJS.ErrnoException = new Error(message);

  error.code = "405";
  return {
    custom: true,
    message,
    status: error.code,
  };
}

ForbiddenErrorException.prototype = Object.create(Error.prototype);
ConflictErrorException.prototype = Object.create(Error.prototype);
BadRequestErrorException.prototype = Object.create(Error.prototype);
ServerErrorException.prototype = Object.create(Error.prototype);
NotFoundErrorException.prototype = Object.create(Error.prototype);
UnAuthorizedErrorException.prototype = Object.create(Error.prototype);
MethodNotAllowedErrorException.prototype = Object.create(Error.prototype);
