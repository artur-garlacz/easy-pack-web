import { HttpErrorResponse } from "./HttpErrorResponse";

export function getErrorMessageFromError(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.statusCode === 401) {
      return "You are unauthenticated.";
    } else if (error.statusCode === 403) {
      return "You are not authorized to view this content.";
    }
  }

  return "Sorry, an error occured. Please try again.";
}
