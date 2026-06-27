import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

/**
 * Application Config (app.config.ts)
 * ----------------------------------------------------
 * Why this file exists:
 * The main configuration entry point for providing global services, routing, and HTTP configurations 
 * in Angular 17.
 * 
 * Angular Features Used:
 * 1. provideRouter: Sets up global navigation paths.
 * 2. provideHttpClient: Enables backend JSON/REST integration capability.
 * 3. provideToastr: Configures ngx-toastr alerts globally.
 * 4. provideAnimationsAsync: Hooks up Angular Animations lazily.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimationsAsync()
  ]
};
