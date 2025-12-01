import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage',
  pure: false,
})
export class ErrorMessagePipe implements PipeTransform {
  transform(
    validationErrors: ValidationErrors | null,
    errorMessageMap: Record<string, string>,
  ): string | undefined {
    if (!validationErrors) {
      return;
    }
    const [errorKey] = Object.keys(validationErrors);
    return errorMessageMap[errorKey];
  }
}
