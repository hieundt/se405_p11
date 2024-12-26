import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(`Email already exists: ${email}`, HttpStatus.CONFLICT);
    this.name = 'EmailAlreadyExistsException';
  }
}

export class EmailDoesNotExistsException extends HttpException {
  constructor(email: string) {
    super(`Email does not exist: ${email}`, HttpStatus.NOT_FOUND);
    this.name = 'EmailDoesNotExistsException';
  }
}

export class PasswordDoesNotMatchException extends HttpException {
  constructor() {
    super('Password does not match', HttpStatus.BAD_REQUEST);
    this.name = 'PasswordDoesNotMatchException';
  }
}

export class ConfirmPasswordDoesNotMatchException extends HttpException {
  constructor() {
    super("Those passwords didn't match. Try again.", HttpStatus.BAD_REQUEST);
    this.name = 'ConfirmPasswordDoesNotMatchException';
  }
}

export class SchemaNotFoundException extends HttpException {
  constructor(schemaName: string, id: string) {
    super(`${schemaName} with id ${id} not found`, HttpStatus.NOT_FOUND);
    this.name = 'SchemaNotFoundException';
  }
}
