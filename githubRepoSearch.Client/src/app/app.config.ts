import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        jwtInterceptor // ✅ No need to use `HTTP_INTERCEPTORS` anymore!
      ])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync()
  ]
};
