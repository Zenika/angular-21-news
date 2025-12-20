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
        'form-control-invalid': ({ state }) => state().touched() && state().invalid(),
        'form-control-valid': ({ state }) => state().touched() && state().valid(),
      },
    }),
  ],
};
