import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideSignalFormsConfig } from '@angular/forms/signals';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideSignalFormsConfig({
      classes: {
        'form-control-invalid': (s) => s.touched() && s.invalid(),
        'form-control-valid': (s) => s.touched() && s.valid(),
      },
    }),
  ],
};
