export class HttpErrorResponse<T extends { message: string }> extends Error {
  constructor(readonly statusCode: number, readonly body: T) {
    super(body.message);
    Object.setPrototypeOf(this, HttpErrorResponse.prototype);
  }
}
